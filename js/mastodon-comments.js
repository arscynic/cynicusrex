const mastodonUser = "stardust";
const mastodonDomain = "fosstodon.org";
const mastodonPostId = document.getElementById("mastodon-url").href.replace(/[^0-9]/g, '');

const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.getElementById("load-comment").addEventListener("click", function () {
  document.getElementById("load-comment").innerHTML = "> Loading ...";
  fetch('https://' + mastodonDomain + '/api/v1/statuses/' + mastodonPostId + '/context')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data['descendants'] &&
        Array.isArray(data['descendants']) &&
        data['descendants'].length > 0) {
        document.getElementById('mastodon-comments-list').innerHTML = "";
        data['descendants'].forEach(function (reply) {
          reply.account.display_name = escapeHtml(reply.account.display_name);
          reply.account.reply_class = reply.in_reply_to_id == mastodonPostId ? "reply-original" : "reply-child";
          reply.created_date = new Date(reply.created_at);
          if (reply.account.acct == mastodonUser) reply.account.acct = mastodonUser + mastodonDomain;
          reply.account.emojis.forEach(emoji => {
            reply.account.display_name = reply.account.display_name.replace(`:${emoji.shortcode}:`,
              `<img class="comment-emoji" src="${escapeHtml(emoji.static_url)}" alt="Emoji ${emoji.shortcode}" />`
            );
          });
          mastodonComment = `
<div class="mastodon-wrapper">
<div class="comment-level ${reply.account.reply_class}">↳</div>
<div class="mastodon-comment">
<div class="comment-meta">
  <div class="comment-avatar"><img src="${escapeHtml(reply.account.avatar_static)}" alt=""></div>
  <div class="comment-author">
    <div class="comment-author-name"><a href="${reply.account.url}" rel="nofollow">${reply.account.display_name}</a></div>
    <div class="comment-author-reply"><a href="${reply.account.url}" rel="nofollow">${escapeHtml(reply.account.acct)}</a></div>
    <div class="comment-date"><a href="${reply.url}" rel="nofollow">Posted on ${reply.created_date.toLocaleString(navigator.language, dateOptions)}</a></div>
  </div>
</div>
<div class="comment-content">${reply.content}</div> 
</div>
</div>`;
          document.getElementById('mastodon-comments-list').appendChild(DOMPurify.sanitize(mastodonComment, { 'RETURN_DOM_FRAGMENT': true }));
        });
      } else {
        document.getElementById('mastodon-comments-list').innerHTML = "<p>No comments yet.</p>";
      }
    });
});