var source = null;
var countUnits = {
  gensh: 0,
  honkai: 0,
  wuthering: 1,
  zzz: 1,
};

jsonData = null;
header_divs = ["header__img", "header__fields input", "header__random"];

$(document).ready(function () {
  $.getJSON("columns.json", function (data) {
    jsonData = data;
  });

  $("[id^='menu-']").on("click", function () {
    var target = $(this).attr("id").replace("menu-", "");
    $(".main-menu").toggleClass("hidden");
    if (target == "guide" || target == "characters") {
      $(".select-game").toggleClass("hidden");
      source = target;
    } else {
      $("." + target).toggleClass("hidden");
    }
    console.log(target);
  });

  $("#btn_shop-game").on("click", function () {
    source = "shop";
    $(".shop").toggleClass("hidden");
    $(".select-game").toggleClass("hidden");
  });

  $(".exit").on("click", function () {
    var divs = [
      ".guide",
      ".shop",
      ".challenges",
      ".characters",
      ".select-game",
      ".guide-list",
    ];
    divs.forEach(function (div) {
      if (!$(div).hasClass("hidden")) {
        $(div).toggleClass("hidden");
      }
    });
    if ($(".main-menu").hasClass("hidden")) {
      $(".main-menu").removeClass("hidden");
    }
    clearStyles();
  });

  $(".guide-list li").click(function () {
    $("." + source).toggleClass("hidden");
    $(".guide-list").toggleClass("hidden");
    source = null;
  });

  $("#game-list li").click(function () {
    if (source == "shop") {
      var content = $(this).text();
      $(".shop__choosen-game").html(content);
      $(".shop").toggleClass("hidden");
      $(".select-game").toggleClass("hidden");
    } else if (source == "guide" || source == "characters") {
      clearStyles();
      changeColor(source, this.id);
      console.log(this.id);

      $(".guide-list").toggleClass("hidden");
      $(".select-game").toggleClass("hidden");
      if (source == "characters") {
        changeGrid(this.id);
        gameData = jsonData.characters[this.id];
        game = this.id;
        const divs = document.querySelectorAll(".characters div");
        divs.forEach(function (div) {
          if (div.className.split(" ")[0] != "") {
            $("." + div.className.split(" ")[0]).html(
              gameData[div.className.split(" ")[0]]
            );
          }
        });
      }
      if (source == "guide") {
        gameData = jsonData.guide[this.id];
        const divs = document.querySelectorAll(".guide ul li div");
        if (countUnits[this.id] == 0) {
          $(".two-unit").addClass("hidden");
          $(".one-unit").removeClass("hidden");
        } else if (countUnits[this.id] == 1) {
          $(".one-unit").addClass("hidden");
          $(".two-unit").removeClass("hidden");
        }
        divs.forEach(function (div) {
          if (div.id != "") {
            $("#" + div.id).html(gameData[div.id]);
          }
        });
      }
    }
  });
});

function clearStyles() {
  console.log("clear");
  var divs = [".guide div", ".characters div", ".guide-list ul li"];
  var styles = ["gensh", "zzz", "wuthering", "honkai"];
  divs.forEach(function (div) {
    styles.forEach(function (style) {
      if ($(div).hasClass(style)) {
        $(div).removeClass(style);
      }
    });
  });
  $(".container").css(
    "background",
    "linear-gradient(0deg, rgba(53, 3, 3, 1) 49%, rgba(26, 3, 3, 1) 100%)"
  );
  $("header").css({
    background: "url(./assets/h-bg/red.jpg) 100% 0",
    "background-size": "cover",
    "background-repeat": "no-repeat",
  });
  $(".container").css("border", "4px #663232 solid");
  if ($(!".guide-list").hasClass("hidden")) {
    $(".guide-list").addClass("hidden");
  }
  header_divs.forEach(function (div) {
    $("." + div).css("background", "#d8b6c0");
  });
}

function changeColor(div, style) {
  $("." + div + " div").toggleClass(style);
  $(".guide-list ul li").toggleClass(style);

  $(".container").css({
    background: "url(./assets/" + style + ".png) no-repeat center center",
    "background-size": "cover",
  });
  $("header").css({
    background: "url(./assets/h-bg/" + style + ".jpg) 100% 0%",
    "background-size": "cover",
    "background-repeat": "no-repeat",
  });
  $(".container").css("border", "4px white solid");

  if (style == "gensh") {
    header_divs.forEach(function (div) {
      $("." + div).css("background", "#8e99ce");
    });
  }
  if (style == "zzz") {
    header_divs.forEach(function (div) {
      $("." + div).css("background", "#49678d");
    });
  }
  if (style == "wuthering") {
    header_divs.forEach(function (div) {
      $("." + div).css("background", "#728baf");
    });
  }
  if (style == "honkai") {
    header_divs.forEach(function (div) {
      $("." + div).css("background", "#573b61");
    });
  }
}

function changeGrid(style) {
  if (style == "gensh" || style == "wuthering") {
    $(".div2").addClass("hidden");
    $(".characters").css("grid-template-columns", "0.8fr repeat(2, 0.5fr) 0");
    $(".div1").css("grid-area", "1 / 4 / 2 / 3");
  } else {
    if ($(".div2").hasClass("hidden")) {
      $(".div2").removeClass("hidden");
    }
    $(".characters").css("grid-template-columns", "0.8fr repeat(3, 0.5fr) 0");
    $(".div1").css("grid-area", "1 / 4 / 2 / 5");
  }
}
