# Cloud Circle

Cloud Circleはエンジニアのためのコミュニティプラットフォームです。みんなと繋がり、開発・研究して仲間と経験をつくろう！

## 使用技術

- [Next.js](https://nextjs.org/)
- [TailWind CSS](https://tailwindcss.com/docs)
- [Apollo Client](https://www.apollographql.com/docs/react)
- [TypeORM](https://typeorm.io/#/)
- [Nest.js](https://docs.nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)

## おすすめ

- [Postico](https://eggerapps.at/postico/) (PostgreSQL Client)
- [SQL Formatter](https://marketplace.visualstudio.com/items?itemName=adpyke.vscode-sql-formatter) (sqlファイルの自動整形拡張ツール)
- [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) (Tailwindのクラス順序自動整形拡張ツール)

## 始め方

```bash
$ cd client && yarn install
$ cd server && yarn install
```

### DBサーバ起動
```bash
$ docker-compose up -d
```

### クライアントサーバ起動
```bash
$ cd client && yarn dev
```

### アプリサーバ起動
```
$ cd server && yarn start:dev
```

## サンプルデータの作成

### DBサーバを起動
```bash
$ docker-compose up -d
```

### テーブルの作成 or 更新
```bash
$ cd server & yarn start:dev
```

### (既にデータが入っている場合)
既にデータが入っている場合は、テーブルまたは、データを全て消してください。
テーブルを全て消した場合は、サーバを再起動して、テーブルを作り直してください。

### サンプルデータの作成
```bash
$ cd seeds
$ make seed
```