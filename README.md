# 程式啟動方式
## clone project
```
git clone https://github.com/mt5718214/wonderpet-graphQL.git
cd wonderpet-graphQL
```
## install the dependencies
```
npm install
```

## start the app
```
npm run app
```

# 程式架構
```bash
├── app.ts            # 主程式進入點
├── config.ts         # config設定檔
├── data
│   └── user.json     # 存放使用者資料的 JSON 檔案
├── gql
│   ├── index.ts      # GraphQL module的入口文件，包含導出所有相關的 schema 和 resolvers
│   ├── resolvers.ts  # GraphQL 解析函數
│   └── schema.ts     # GraphQL Schema 定義
├── package-lock.json
├── package.json
├── tsconfig.json
├── types.ts          # 一些自定義的type, interface
└── util
    └── commonTool.ts # 常用工具函數 (password加解密, jwt驗證, 讀取json資料)
```

# api 的規格與範例
## User's login info
```
{
  "account": "user1",
  "password": "password",
},
{
  "account": "user2",
  "password": "andy1234",
},
{
  "account": "user3",
  "password": "su3y942l487",
}
```
## endpoint
```
query Login($account: String!, $password: String!) {
  login(account: $account, password: $password) {
    data
    msg
  }
}
```
### Login帶入參數
![](./doc/img/login.png)

```
query Me {
  me {
    data {
      birthday
      account
      name
    }
    msg
    errormsg
  }
}
```
### Headers Authorization 帶入token
![](./doc/img/token.png)

# 研究心得
```
我最近花了一些時間研究 GraphQL，並且順利地構建了一個 GraphQL Apollo Server。這次的專案對我而言是一個全新的開始，完全從無到有建置一個完整的 GraphQL 伺服器，包含了 typeDefs 和 resolvers 的編寫。這些內容也被切分到各個獨立的 TypeScript 檔案中。透過 @graphql-tools/schema 套件提供的 makeExecutableSchema 函式，我能夠輕易地構建出可執行的 Schema。

同時，我也研究了如何透過 context 在不同的 resolvers 或其他模組之間傳遞 middleware。透過這樣的做法，我能夠在各種解析函式之間分享資訊與功能。然而，我也注意到這種做法有一些局限性。隨著 middleware 數量增加，context 物件會變得龐大，導致維護性下降。

因此，在處理 context 中傳遞 middleware 時，我意識到需要一些調整。當 middleware 變得複雜時，我會考慮將共用的功能和邏輯封裝成獨立的中介層，而非將所有東西都注入到 context 中。另一種解決方案是透過自定義的插件機制，根據特定的事件來執行相對應的 middleware。這能夠有效降低 context 的複雜性，使程式碼更加模組化且易於管理。
```

