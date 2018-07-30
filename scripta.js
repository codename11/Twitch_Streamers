/*Stream links in Codepen can be opened only if you use open in new /tab/window ... Note: It works normally in localhost though ... */
var streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

function getData(key, type) {
  var url =
    "https://wind-bow.gomix.me/twitch-api/" + type + "/" + key + "?callback=?";
  return $.getJSON(url).then(res => ({ key: key, type: type, data: res }));
}

var requests = streamers.map(key => {
  return getData(key, "streams").then(
    res => (res.data.stream ? res : getData(key, "channels"))
  );
});

Promise.all(requests).then(results => {
  /*results.forEach(o => console.log(o.key, " type is ", o.type));
    console.log(results.map(o => o.data));*/

  for (var i = 0; i < results.length; i++) {
    /*$("#ttt").prepend(i + ". " + JSON.stringify(results[i]) + "</br></br>");*/

    if (results[i].data.stream) {
      $("#on").prepend(
        "<div class='row on-row'><div class='col-sm-2'><img class='img-responsive img-circle on-img' src='" +
          results[i].data.stream.channel.logo +
          "'></div><div class='col-sm-3 text-center'><a href='" +
          results[i].data.stream.channel.url +
          "' target='_blank'>" +
          results[i].data.stream.channel.display_name +
          "</a></div><div class='col-sm-7 text-center'>" +
          results[i].data.stream.channel.game +
          ": " +
          results[i].data.stream.channel.status +
          " ... " +
          "</div></div>"
      );
    } else if (!results[i].data.stream) {
      $("#off").prepend(
        "<div class='row on-row off-line-row'><div class='col-sm-2'><img class='img-responsive img-circle on-img' src='" +
          results[i].data.logo +
          "'></div><div class='col-sm-3 text-center'><a href='" +
          results[i].data.url +
          "' target='_blank' style='color: #b8cca6;'>" +
          results[i].data.display_name +
          "</a></div><div class='col-sm-7 text-center streamer off-line-cell' style='color: #8ea7c2;'>" +
          "offline" +
          "</div></div>"
      );
    }

    if (results[i].data && !results[i].data.stream) {
      $("#all").prepend(
        "<div class='row on-row off-line-row'><div class='col-sm-2'><img class='img-responsive img-circle on-img' src='" +
          results[i].data.logo +
          "'></div><div class='col-sm-3 text-center'><a href='" +
          results[i].data.url +
          "' target='_blank' style='color: #b8cca6;'>" +
          results[i].data.display_name +
          "</a></div><div class='col-sm-7 text-center streamer off-line-cell' style='color: #8ea7c2;'>" +
          "offline" +
          "</div></div>"
      );
    }

    if (results[i].data.stream) {
      $("#all").prepend(
        "<div class='row on-row'><div class='col-sm-2'><img class='img-responsive img-circle on-img' src='" +
          results[i].data.stream.channel.logo +
          "'></div><div class='col-sm-3 text-center'><a href='" +
          results[i].data.stream.channel.url +
          "' target='_blank'>" +
          results[i].data.stream.channel.display_name +
          "</a></div><div class='col-sm-7 text-center'>" +
          results[i].data.stream.channel.game +
          ": " +
          results[i].data.stream.channel.status +
          " ... " +
          "</div></div>"
      );
    }
  }
});
