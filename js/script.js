window.onload = function () {
  const $goldTotal = $(".gold-total");
  const $silverTotal = $(".silver-total");
  const $copperTotal = $(".copper-total");
  const $electrumTotal = $(".electrum-total");
  const $platinumTotal = $(".platinum-total");
  const $convertedGold = $(".converted-gold");
  const $convertedSilver = $(".converted-silver");
  const $convertedCopper = $(".converted-copper");
  const $convertedElectrum = $(".converted-electrum");
  const $convertedPlatinum = $(".converted-platinum");
  const $goldInput = $(".gold-input");
  const $silverInput = $(".silver-input");
  const $copperInput = $(".copper-input");
  const $electrumInput = $(".electrum-input");
  const $platinumInput = $(".platinum-input");
  const $btnAdd = $("#add");
  const $btnSubtract = $("#subtract");
  //set currency to zero to start
  let currencies = {
    gold: 0,
    silver: 0,
    copper: 0,
    platinum: 0,
    electrum: 0,
  };

  //total converter copper. will use this to track all conversions
  let baseCopper = 0;

  //if no local storage, set local storage currency to 0
  if (!localStorage.currencies) clearCurrency();
  else {
    getLocalStorage();
  }

  update_UI();

  function adjustCurrency(adjustType) {
    inputs = getInput();
    //Add or Subtract
    if (adjustType === "add") {
      for (let input in inputs) {
        currencies[input] =
          parseInt(currencies[input]) + parseInt(inputs[input]);
      }
    } else {
      for (let input in inputs) {
        currencies[input] =
          parseInt(currencies[input]) - parseInt(inputs[input]);
      }
    }

    localStorage.setItem("currencies", JSON.stringify(currencies));

    update_UI();
    console.log(currencies);
  }

  function getInput() {
    const inputObj = {
      gold: $goldInput.val(),
      silver: $silverInput.val(),
      copper: $copperInput.val(),
      platinum: $platinumInput.val(),
      electrum: $electrumInput.val(),
    };
    return inputObj;
  }

  function update_UI() {
    $goldTotal.html(`Gold: ${currencies.gold}`);
    $platinumTotal.html(`Platinum: ${currencies.platinum} `);
    $silverTotal.html(`Silver: ${currencies.silver} `);
    $copperTotal.html(`Copper: ${currencies.copper} `);
    $electrumTotal.html(`Electrum: ${currencies.electrum} `);

    convertCurrency();

    $convertedGold.html(
      `${Math.floor(baseCopper / 100)}  <i class="fas fa-coins gold-coin"></i>`
    );
    $convertedPlatinum.html(
      `${Math.floor(
        baseCopper / 1000
      )} <i class="fas fa-coins platinum-coin"></i>`
    );
    $convertedSilver.html(
      `${Math.floor(baseCopper / 10)} <i class="fas fa-coins silver-coin"></i>`
    );
    $convertedCopper.html(
      `${Math.floor(baseCopper)} <i class="fas fa-coins copper-coin"></i>`
    );
    $convertedElectrum.html(
      `${Math.floor(baseCopper / 50)} <i class="fas fa-coins electrum"></i>`
    );
  }

  function convertCurrency() {
    baseCopper =
      parseInt(currencies.gold) * 100 +
      parseInt(currencies.silver) * 10 +
      parseInt(currencies.platinum) * 1000 +
      parseInt(currencies.electrum) * 50 +
      parseInt(currencies.copper);

    console.log(baseCopper);
  }

  // Helper function
  function clearCurrency() {
    localStorage.setItem("currencies", JSON.stringify(currencies));
    let retrievedObj = JSON.parse(localStorage.getItem("currencies"));

    console.log("currencies: ", retrievedObj);
  }

  function getLocalStorage() {
    currencies = JSON.parse(localStorage.getItem("currencies"));
    console.log(currencies);
  }

  $($btnAdd).on("click", function (el) {
    adjustCurrency(el.target.id);
  });

  $($btnSubtract).on("click", function (el) {
    adjustCurrency(el.target.id);
  });

  $("input.currency-input").on("focusout", function (el) {
    if (el.target.value.trim() === "") {
      el.target.value = 0;
    }
  });

  // On Page Load
};
