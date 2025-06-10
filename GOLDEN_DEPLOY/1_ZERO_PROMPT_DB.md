-- ===============================================================================
-- KOMPLETNA IMPLEMENTACJA BAZY DANYCH
-- Plik: db/complete_schema.sql
-- ===============================================================================

-- 1. ROZSZERZENIA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TYPY ENUM
CREATE TYPE user_role AS ENUM ('student','teacher','admin');
CREATE TYPE task_type AS ENUM ('multiple_choice','true_false','fill_blank');

-- ===============================================================================
-- 3. TABELE GŁÓWNE
-- ===============================================================================

-- Użytkownicy
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      TEXT NOT NULL UNIQUE,
  username   TEXT,
  role       user_role NOT NULL,
  avatar_url TEXT,
  xp         INT NOT NULL DEFAULT 0,
  level      INT NOT NULL DEFAULT 1,
  streak     INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lekcje
CREATE TABLE lessons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT,
  author_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject         TEXT,
  education_level TEXT,    -- np. Szkoła podstawowa
  grade           TEXT,    -- np. Klasa 3
  topic           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Artykuły powiązane z lekcją
CREATE TABLE articles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id   UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Zadania (quizy)
CREATE TABLE tasks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id       UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  article_id      UUID REFERENCES articles(id) ON DELETE CASCADE,
  type            task_type NOT NULL,
  question_text   TEXT NOT NULL,
  options         JSONB,
  correct_answer  TEXT NOT NULL,
  explanation     TEXT,
  xp_reward       INT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Postępy ucznia
CREATE TABLE progress (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score        INT NOT NULL,
  total_tasks  INT NOT NULL,
  correct_tasks INT NOT NULL,
  attempts_count INT NOT NULL DEFAULT 1,
  streak_bonus INT NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Błędne odpowiedzi - dla analizy słabych punktów
CREATE TABLE incorrect_answers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id      UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  given_answer TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Odznaki
CREATE TABLE badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  icon_url    TEXT
);

-- Odznaki użytkownika
CREATE TABLE user_badges (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id   UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Kryteria przyznawania odznak
CREATE TABLE badge_criteria (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_id       UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  criteria_type  TEXT NOT NULL CHECK (criteria_type IN ('level', 'streak', 'xp')),
  criteria_value INT NOT NULL CHECK (criteria_value > 0),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(badge_id, criteria_type)
);

-- Klasy i przypisania uczniów
CREATE TABLE classes (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,            -- np. '3A'
  education_year INT NOT NULL,             -- np. 2024
  grade          TEXT NOT NULL,            -- np. 'Klasa 3'
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE class_enrollments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id     UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  left_at      TIMESTAMPTZ,
  UNIQUE(user_id, class_id, enrolled_at)
);

-- Mapowanie lekcji do klas (dostęp uczniów)
CREATE TABLE class_lessons (
  class_id  UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, lesson_id)
);

-- ===============================================================================
-- 4. WIDOKI
-- ===============================================================================

-- Ranking uczniów
CREATE VIEW student_rankings AS
SELECT
  u.id       AS user_id,
  u.username,
  u.xp,
  u.level,
  u.streak,
  DENSE_RANK() OVER (ORDER BY u.xp DESC) AS rank
FROM users u
WHERE u.role = 'student';

-- Postęp per lekcja (średnia)
CREATE VIEW lesson_progress AS
SELECT
  p.user_id,
  p.lesson_id,
  AVG(p.score)     AS avg_score,
  MAX(p.completed_at) AS last_attempt
FROM progress p
GROUP BY p.user_id, p.lesson_id;

-- Analiza błędów - najczęstsze problemy
CREATE VIEW error_analysis AS
SELECT 
  l.subject,
  l.topic,
  t.question_text,
  COUNT(*) as error_count,
  COUNT(DISTINCT ia.user_id) as students_with_errors
FROM incorrect_answers ia
JOIN tasks t ON ia.task_id = t.id
JOIN lessons l ON ia.lesson_id = l.id
GROUP BY l.subject, l.topic, t.question_text
ORDER BY error_count DESC;

-- ===============================================================================
-- 5. INDEKSY
-- ===============================================================================
CREATE INDEX idx_lessons_author_id       ON lessons(author_id);
CREATE INDEX idx_articles_lesson_id      ON articles(lesson_id);
CREATE INDEX idx_tasks_lesson_id         ON tasks(lesson_id);
CREATE INDEX idx_tasks_article_id        ON tasks(article_id);
CREATE INDEX idx_progress_user_id        ON progress(user_id);
CREATE INDEX idx_progress_lesson_id      ON progress(lesson_id);
CREATE INDEX idx_user_badges_user_id     ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id    ON user_badges(badge_id);
CREATE INDEX idx_badge_criteria_badge_id ON badge_criteria(badge_id);
CREATE INDEX idx_badge_criteria_type     ON badge_criteria(criteria_type);
CREATE INDEX idx_class_enrollments_user  ON class_enrollments(user_id);
CREATE INDEX idx_class_enrollments_class ON class_enrollments(class_id);
CREATE INDEX idx_class_lessons_class     ON class_lessons(class_id);
CREATE INDEX idx_class_lessons_lesson    ON class_lessons(lesson_id);
CREATE INDEX idx_incorrect_answers_user_id    ON incorrect_answers(user_id);
CREATE INDEX idx_incorrect_answers_task_id    ON incorrect_answers(task_id);
CREATE INDEX idx_incorrect_answers_lesson_id  ON incorrect_answers(lesson_id);
CREATE INDEX idx_incorrect_answers_created_at ON incorrect_answers(created_at);