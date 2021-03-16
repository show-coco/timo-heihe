INSERT INTO
  category
VALUES
  (1, 'Web'),
  (2, 'iOS'),
  (3, 'Android');

INSERT INTO
  skill
VALUES
  (1, 'typescript', ''),
  (2, 'nestjs', ''),
  (3, 'go', '');

INSERT INTO
  "user" (
    "userId",
    "name",
    "email",
    "introduction",
    "avatar",
    "githubId",
    "twitterId",
    "googleId"
  )
VALUES
  (
    'test1',
    'test1',
    'sample1@example.com',
    'こんぬづわ',
    'http://flat-icon-design.com/f/f_object_99/s256_f_object_99_0bg.png',
    '',
    '',
    '100453910579362727901'
  ),
  (
    'test2',
    'test2',
    'sample2@example.com',
    'こんにちは',
    'http://flat-icon-design.com/f/f_object_122/s256_f_object_122_0bg.png',
    '',
    '',
    '100453910579362727902'
  );

INSERT INTO
  room_type
VALUES
  (1, '開発'),
  (2, '技術研究'),
  (3, 'ハッカソン'),
  (4, 'フリー');

INSERT INTO
  room (
    "id",
    "name",
    "title",
    "slug",
    "icon",
    "description",
    "repositoryUrl",
    "withApplication",
    "recruiting",
    "ownerId",
    "invidationUrl"
  )
VALUES
  (
    1,
    'test room1',
    'Web界隈の人あつまれい！みんなで開発しよう',
    'test1',
    'http://flat-icon-design.com/f/f_object_174/s256_f_object_174_0bg.png',
    '# 何をしているのか(H1)
Web開発やってます

## 求める人材(H2)

- フロントエンド
- バックエンド

### あ(H3)
こんにちは',
    '',
    false,
    true,
    1,
    'https://join.slack.com/t/timo-heihe/shared_invite/zt-nr17990g-Sx~3aCGcdEBWJziwYEN77w'
  ),
  (
    2,
    'test room2',
    'Android開発の練習しよ',
    'test2',
    'http://flat-icon-design.com/f/f_object_108/s256_f_object_108_0bg.png',
    '# 何をしているのか
Androiddddd

## 求める人材

- フロントエンド
- バックエンド

### あ
こんにちは',
    '',
    true,
    true,
    2,
    null
  ),
  (
    3,
    'test room3',
    'Next.js研究したい人募集',
    'test3',
    'http://flat-icon-design.com/f/f_event_98/s256_f_event_98_0bg.png',
    '# 何をしているのか
Androiddddd

## 求める人材

- フロントエンド
- バックエンド

### あ
こんにちは',
    '',
    true,
    true,
    2,
    null
  ),
  (
    4,
    'test room4',
    'フロントエンド開発したい人募集',
    'test4',
    'http://flat-icon-design.com/f/f_event_98/s256_f_event_98_0bg.png',
    '# 何をしているのか
Androiddddd

## 求める人材

- フロントエンド
- バックエンド

### あ
こんにちは',
    '',
    true,
    true,
    2,
    null
  ),
  (
    5,
    'test room5',
    'ハッカソン出場者募集',
    'test5',
    'http://flat-icon-design.com/f/f_event_98/s256_f_event_98_0bg.png',
    '# 何をしているのか
Androiddddd

## 求める人材

- フロントエンド
- バックエンド

### あ
こんにちは',
    '',
    true,
    true,
    2,
    null
  );

INSERT INTO
  room_skills_skill
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 1),
  (4, 2),
  (5, 1);

INSERT INTO
  room_types_room_type ("roomId", "roomTypeId")
VALUES
  (1, 1),
  (2, 1),
  (1, 2),
  (3, 2),
  (4, 2),
  (4, 1),
  (4, 3),
  (5, 3);

INSERT INTO
  room_categories_category ("roomId", "categoryId")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 1);

INSERT INTO
  user_skills_skill ("userId", "skillId")
VALUES
  (1, 1),
  (1, 2),
  (2, 1);

INSERT INTO
  room_applying_user ("roomId", "userId")
VALUES
  (2, 2),
  (4, 2);

INSERT INTO
  recruitment_level ("name")
VALUES
  ('初級者'),
  ('中級者'),
  ('上級者');

INSERT INTO
  room_recruitment_levels_recruitment_level ("roomId", "recruitmentLevelId")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 2),
  (4, 1);