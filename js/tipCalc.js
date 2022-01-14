const tipCalc = {
    // Input selector
    billInput: document.querySelector('.userInput__bill__input--amount'),
    percentBtn: document.querySelectorAll('.percent__btn'),
    personInput: document.querySelector('.userInput__peopleCount__select--input'),
    customPercentInput: document.querySelector('.custom-percentage'),
    // Output selector
    billOutput: document.querySelector('.output__amount__tip'),
    personOutput: document.querySelector('.output__amount__total'),
    // Useful variable
    selectedPercent: 15,
    customSelected: false,
    // Error element selector
    errorMessageElement: document.querySelector('#userInput__peopleCount__label--warning'),

    // Initializing function with every EventListener
    init: function () {
        // Input listener
        const requieredPersonInput = document.querySelectorAll('.input-element');
        for (let inputElement of requieredPersonInput) {
            inputElement.addEventListener("input", tipCalc.handlerFormOutput);
        }
        // Percent button listener
        for (let percentBtnElement of tipCalc.percentBtn) {
            percentBtnElement.addEventListener("click", tipCalc.handlerSelectedPercent);
        }
        // Custom percent listener
        document.querySelector('.custom-percentage').addEventListener("input", tipCalc.handlerCustonPercent);
        // Reset button listener
        const resetBtn = document.querySelector('.output__reset--btn');
        resetBtn.addEventListener("click", tipCalc.resetResult);
    },
    // Add error message or execute showResult()
    handlerFormOutput: function (evt) {
        if (tipCalc.personInput.value == "") {
            tipCalc.errorMessageElement.classList.remove('no-warning');
            tipCalc.personInput.classList.add('input-warning');
        } else {
            tipCalc.errorMessageElement.classList.add('no-warning');
            tipCalc.personInput.classList.remove('input-warning');
            tipCalc.showResult();
        }
    },
    // What happens when any percent btn are clicked
    handlerSelectedPercent: function (evt) {
        // If a custom percent was submit
        if (tipCalc.customSelected) {
            // reset custom percent
            tipCalc.customSelected = false;
            tipCalc.customPercentInput.value = '';
            // Getting percent button info and selecting it
            const percentBtnClicked = evt.currentTarget.dataset.percent;
            let percentBtnElement = document.querySelector("[data-percent='" + percentBtnClicked + "']");
            percentBtnElement.classList.add('percent__btn--selected');
            tipCalc.selectedPercent = percentBtnClicked;
            tipCalc.showResult();
        } else {
            const percentBtnClicked = evt.currentTarget.dataset.percent;
            let percentBtnElement = document.querySelector("[data-percent='" + percentBtnClicked + "']");
            tipCalc.removePercentButtonSelectedClass()
            percentBtnElement.classList.add('percent__btn--selected');
            tipCalc.selectedPercent = percentBtnClicked;
            tipCalc.showResult();
        }

    },
    // What happens if any custom percent are entered
    handlerCustonPercent: function (evt) {
        let customPercentInputValue = tipCalc.customPercentInput.value;
        tipCalc.removePercentButtonSelectedClass()
        tipCalc.selectedPercent = customPercentInputValue;
        tipCalc.customSelected = true;
        tipCalc.showResult();
    },
    // Push result in the output section
    showResult: function () {
        const percent = parseInt(tipCalc.selectedPercent);
        const total = parseInt(tipCalc.billInput.value);
        const person = parseInt(tipCalc.personInput.value);
        let tipAmount = ((percent * total) / 100) / person;
        let totalAmount = (((percent * total) / 100) + total) / person;
        tipAmount = Math.round(tipAmount * 100) / 100;
        totalAmount = Math.round(totalAmount * 100) / 100;
        tipCalc.billOutput.textContent = '$' + tipAmount;
        tipCalc.personOutput.textContent = '$' + totalAmount;
    },
    // Remove the selected class of every percent btn
    removePercentButtonSelectedClass: function () {
        for (let percentBtnElement of tipCalc.percentBtn) {
            percentBtnElement.classList.remove('percent__btn--selected');
        }
    },
    // What happens if the reset btn is clicked
    resetResult: function () {
        selectedPercent = 15;
        tipCalc.removePercentButtonSelectedClass()
        let defaultPercentBtn = document.querySelector("[data-percent='15']");
        defaultPercentBtn.classList.add('percent__btn--selected');
        tipCalc.customSelected = false;
        tipCalc.billOutput.textContent = '$0.00';
        tipCalc.personOutput.textContent = '$0.00';
    }

}