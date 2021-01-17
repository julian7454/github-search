# github-search
## 運作環境
請在 Node 10.14.2 以上環境執行

### install
yarn

### start local server
yarn start

### web site
https://julian7454.github.io/github-search/index.html

### 設計要點
#### Set input value automatically on a fetch request
- 使用 redux 做資料儲存，redux-thunk 處理非同步請求。
- reducer 的 repos 以每次輸入的 input 當作 key，若已有輸入相同字元直接取出，沒有才發送請求。
- 輸入階段設置 timeout, 避免過於頻繁地發出不必要的請求。
- 確認 input value 和返回的 response key 相同，避免非預期的畫面更新。

#### infinite scroll
- 使用 IntersectionObserver 判斷畫面下方的 div 是否進入 root 範圍
- 若 API error 或無資料時就不再發送請求。
- 以 Tombstones 和 loading icon 來優化等待體驗。
- 可再優化部分： 
  - Tombstones 和實際呈現資料的 DOM 結構共用讓體驗更順暢。
  - DOM recycling，避免畫面的 DOM 持續增加造成佈局和重繪成本。
