

function getData(user, callback) {
  var stuff = [];
  $.getJSON("https://api.twitch.tv/kraken/streams/" + user + "?callback=?", function(data) {
    stuff.push(user);
    stuff.push(JSON.stringify(data));
    callback(stuff);
  });
};

function getDataOffline(user, callback) {
  var stuff = [];
  $.getJSON("https://api.twitch.tv/kraken/channels/" + user + "?callback=?", function(data) {
    stuff.push(user);
    stuff.push(JSON.stringify(data));
    callback(stuff);
  });

};

var users = ["freecodecamp", "OgamingSC2", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "ESL_SC2"];

function both() {

  $("#boxes").empty();

  $(users).each(function() {

    getData(this, function(name) {

      if (name[1].substring(2, 7) == "error") {
        // doesn't exist
        //console.log("doesn't exist");

        var pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";

        $("#boxes").append("<div class= boxOff><div class= left><img class=roundOff src=" + pic + "><p>" + name[0] + "</p></div><div class= right><p><i>Account Closed</i></p></div></div>");

      } else {
        var obj = JSON.parse(name[1]);

        if (obj.stream == null) {
          // not online
          //console.log("offline");

          getDataOffline(name[0], function(name) {

            var obj = JSON.parse(name[1]);
            var pic = obj.logo;
            if (pic === null) {
              pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";
            }

            $("#boxes").append("<div class= boxOff><div class= left><img class=roundOff src=" + pic + "><a target= _blank href=" + obj.url + "><p>" + name[0] + "</p></a></div><div class= right><p><i>Offline</i></p></div></div>");

          });

        } else {
          // online
          // console.log("online");

          var pic = obj.stream.channel.logo;

          if (pic === null) {

            pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";
          }

          $("#boxes").prepend("<div class= box><div class= left><img class=round src=" + pic + "><a target= _blank href=" + obj.stream.channel.url + "><p>" + name[0] + "</p></a></div><div class= right><p><i>" + obj.stream.game + " " + obj.stream.channel.status + "</i></p></div></div>");

        }

      }
    });

  });
};

function onlineOnly() {

  $("#boxes").empty();
  $(users).each(function() {

    getData(this, function(name) {

      if (name[1].substring(2, 7) !== "error") {
        // doesn't exist
        //console.log("doesn't exist");

        var obj = JSON.parse(name[1]);

        if (obj.stream !== null) {

          // online
          // console.log("online");

          var pic = obj.stream.channel.logo;

          if (pic === null) {

            pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";
          }

          $("#boxes").prepend("<div class= box><div class= left><img class=round src=" + pic + "><a target= _blank href=" + obj.stream.channel.url + "><p>" + name[0] + "</p></a></div><div class= right><p><i>" + obj.stream.game + " " + obj.stream.channel.status + "</i></p></div></div>");

        }
      }
    });
  });

};

function offlineOnly() {

  $("#boxes").empty();

  $(users).each(function() {

    getData(this, function(name) {

      if (name[1].substring(2, 7) == "error") {
        // doesn't exist
        //console.log("doesn't exist");

        var pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";

        $("#boxes").append("<div class= boxOff><div class= left><img class=roundOff src=" + pic + "><p>" + name[0] + "</p></div><div class= right><p><i>Account Closed</i></p></div></div>");

      } else {
        var obj = JSON.parse(name[1]);

        if (obj.stream == null) {
          // not online
          //console.log("offline");

          getDataOffline(name[0], function(name) {

            var obj = JSON.parse(name[1]);
            var pic = obj.logo;
            if (pic === null) {
              pic = "http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg";
            }

            $("#boxes").append("<div class= boxOff><div class= left><img class=roundOff src=" + pic + "><a target= _blank href=" + obj.url + "><p>" + name[0] + "</p></a></div><div class= right><p><i>Offline</i></p></div></div>");

          });

        }

      }
    });

  });
};
$( document ).ready(function(){
both();
});