-- ===============================================================================
-- 11. PRZYKŁADOWE DANE TESTOWE - CIEKAWSZA WERSJA
-- ===============================================================================

-- Dodaj różnorodne odznaki z ciekawymi nazwami i opisami
INSERT INTO badges (id, name, description, icon_url) VALUES 
-- Odznaki XP (doświadczenie)
(uuid_generate_v4(), '🌱 Pierwszy Krok', 'Zdobyłeś swoje pierwsze punkty doświadczenia!', '/icons/first-step.svg'),
(uuid_generate_v4(), '💰 Kolekcjoner', 'Zebrałeś 100 punktów XP', '/icons/collector.svg'),
(uuid_generate_v4(), '💎 Skarb Wiedzy', 'Zdobyłeś 500 punktów XP', '/icons/treasure.svg'),
(uuid_generate_v4(), '👑 Władca XP', 'Osiągnąłeś 1000 punktów XP', '/icons/xp-king.svg'),
(uuid_generate_v4(), '🚀 Kosmonauta', 'Przebiłeś 2500 punktów XP', '/icons/astronaut.svg'),

-- Odznaki poziomów
(uuid_generate_v4(), '⭐ Wschodzące Słońce', 'Osiągnąłeś poziom 3', '/icons/rising-sun.svg'),
(uuid_generate_v4(), '🔥 Płonący Duch', 'Osiągnąłeś poziom 5', '/icons/burning-spirit.svg'),
(uuid_generate_v4(), '⚡ Błyskawica', 'Osiągnąłeś poziom 8', '/icons/lightning.svg'),
(uuid_generate_v4(), '🌟 Na Orbicie', 'Osiągnąłeś poziom 10', '/icons/orbit.svg'),
(uuid_generate_v4(), '💫 Supernowa', 'Osiągnąłeś poziom 15', '/icons/supernova.svg'),
(uuid_generate_v4(), '🏆 Legenda', 'Osiągnąłeś poziom 20', '/icons/legend.svg'),

-- Odznaki streak (passów)
(uuid_generate_v4(), '🔥 Iskra', 'Utrzymałeś 3-dniową passę', '/icons/spark.svg'),
(uuid_generate_v4(), '⚡ Piorun', 'Utrzymałeś 7-dniową passę', '/icons/thunder.svg'),
(uuid_generate_v4(), '🌪️ Tornado', 'Utrzymałeś 14-dniową passę', '/icons/tornado.svg'),
(uuid_generate_v4(), '🌊 Tsunami', 'Utrzymałeś 21-dniową passę', '/icons/tsunami.svg'),
(uuid_generate_v4(), '🔱 Trójząb Neptuna', 'Utrzymałeś 30-dniową passę', '/icons/trident.svg'),
(uuid_generate_v4(), '🎖️ Żelazna Wola', 'Utrzymałeś 60-dniową passę', '/icons/iron-will.svg'),
(uuid_generate_v4(), '👑 Nieustraszony', 'Utrzymałeś 100-dniową passę', '/icons/fearless.svg');

-- Dodaj kryteria odznak
INSERT INTO badge_criteria (badge_id, criteria_type, criteria_value) SELECT 
    b.id,
    CASE 
        -- XP badges
        WHEN b.name = '🌱 Pierwszy Krok' THEN 'xp'
        WHEN b.name = '💰 Kolekcjoner' THEN 'xp'
        WHEN b.name = '💎 Skarb Wiedzy' THEN 'xp'
        WHEN b.name = '👑 Władca XP' THEN 'xp'
        WHEN b.name = '🚀 Kosmonauta' THEN 'xp'
        
        -- Level badges
        WHEN b.name = '⭐ Wschodzące Słońce' THEN 'level'
        WHEN b.name = '🔥 Płonący Duch' THEN 'level'
        WHEN b.name = '⚡ Błyskawica' THEN 'level'
        WHEN b.name = '🌟 Na Orbicie' THEN 'level'
        WHEN b.name = '💫 Supernowa' THEN 'level'
        WHEN b.name = '🏆 Legenda' THEN 'level'
        
        -- Streak badges
        WHEN b.name = '🔥 Iskra' THEN 'streak'
        WHEN b.name = '⚡ Piorun' THEN 'streak'
        WHEN b.name = '🌪️ Tornado' THEN 'streak'
        WHEN b.name = '🌊 Tsunami' THEN 'streak'
        WHEN b.name = '🔱 Trójząb Neptuna' THEN 'streak'
        WHEN b.name = '🎖️ Żelazna Wola' THEN 'streak'
        WHEN b.name = '👑 Nieustraszony' THEN 'streak'
    END,
    CASE 
        -- XP values
        WHEN b.name = '🌱 Pierwszy Krok' THEN 1
        WHEN b.name = '💰 Kolekcjoner' THEN 100
        WHEN b.name = '💎 Skarb Wiedzy' THEN 500
        WHEN b.name = '👑 Władca XP' THEN 1000
        WHEN b.name = '🚀 Kosmonauta' THEN 2500
        
        -- Level values
        WHEN b.name = '⭐ Wschodzące Słońce' THEN 3
        WHEN b.name = '🔥 Płonący Duch' THEN 5
        WHEN b.name = '⚡ Błyskawica' THEN 8
        WHEN b.name = '🌟 Na Orbicie' THEN 10
        WHEN b.name = '💫 Supernowa' THEN 15
        WHEN b.name = '🏆 Legenda' THEN 20
        
        -- Streak values
        WHEN b.name = '🔥 Iskra' THEN 3
        WHEN b.name = '⚡ Piorun' THEN 7
        WHEN b.name = '🌪️ Tornado' THEN 14
        WHEN b.name = '🌊 Tsunami' THEN 21
        WHEN b.name = '🔱 Trójząb Neptuna' THEN 30
        WHEN b.name = '🎖️ Żelazna Wola' THEN 60
        WHEN b.name = '👑 Nieustraszony' THEN 100
    END
FROM badges b;

-- ===============================================================================
-- KONIEC KOMPLETNEJ IMPLEMENTACJI
-- ===============================================================================