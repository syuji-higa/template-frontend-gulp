<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description">
    <meta name="keywords">
    <meta property="og:title">
    <meta property="og:description">
    <meta property="og:url">
    <meta property="og:image">
    <meta property="og:type">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1">
    <meta name="format-detection" content="telephone=no">
    <link rel="apple-touch-icon" type="image/png" href="cms/img/apple-touch-icon.png">
    <link rel="stylesheet" href="/sp/styles/style.css" media="all">
    <script src="/sp/scripts/index.js"></script>
  </head>
  <body class="body-class" id="body-id">
    <div class="wrap">
      <header></header>
      <div class="contents">
        <p>I'm hungry.</p>
        <p><img src="images/circle.png" alt=""></p>
        <p><img src="images/sample.gif" alt=""></p>
      </div>
      <div class="result"></div>
      <script class="template" type="text/template">
        <% _.each(data, function(v) { %>
        <p data-<%= v.class %>>-----</p>
        <p class="<%= v.class %>"><%= v.name %></p>
        <p><%= v.age %></p><% }); %>
      </script>
      <footer></footer>
    </div>
  </body>
</html>