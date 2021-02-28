# Cloud Circle

Cloud Circleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！

## 使用技術

- Next.js
- TailWind CSS
- Apollo Client
- TypeORM
- Nest.js
- PostgreSQL

## 始め方

```bash
cd client && yarn install
cd server && yarn install
```

```bash
cd client && yarn dev
docker-compose up -d
cd server && yarn start:dev
```

## サンプルデータの作成

### DBサーバを起動
```bash
$ docker-compose up -d
```

### テーブルの作成 or 更新
```
$ cd server & yarn start:dev
```

### サンプルデータの作成
```
$ cd seed & make seed
```