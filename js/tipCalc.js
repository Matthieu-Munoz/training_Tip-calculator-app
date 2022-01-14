const tipCalc = {
    init: function () {
        const requieredPersonInput = document.querySelectorAll('.input-element');
        for (let inputElement of requieredPersonInput) {
            inputElement.addEventListener("input", tipCalc.handlerFormOutput);
        }

        for (let percentBtnElement of tipCalc.percentBtn) {
            percentBtnElement.addEventListener("click", tipCalc.handlerSelectedPercent);
        }

        document.querySelector('.custom-percentage').addEventListener("input", tipCalc.handlerCustonPercent);

        const resetBtn = document.querySelector('.output__reset--btn')
        resetBtn.addEventListener("click", tipCalc.resetResult);
    },
    percentBtn: document.querySelectorAll('.percent__btn'),

    billInput: document.querySelector('.userInput__bill__input--amount'),

    personInput: document.querySelector('.userInput__peopleCount__select--input'),

    selectedPercent: 15,

    customSelected: false,

    customPercentInput: document.querySelector('.custom-percentage'),

    billOutput: document.querySelector('.output__amount__tip'),

    personOutput: document.querySelector('.output__amount__total'),

    errorMessageElement: document.querySelector('#userInput__peopleCount__label--warning'),

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

    handlerSelectedPercent: function (evt) {
        if (tipCalc.customSelected === true) {
            tipCalc.customSelected = false;
            tipCalc.customPercentInput.value = ''
            const percentBtnClicked = evt.currentTarget.dataset.percent
            let percentBtnElement = document.querySelector("[data-percent='" + percentBtnClicked + "']");
            percentBtnElement.classList.add('percent__btn--selected');
            tipCalc.selectedPercent = percentBtnClicked;
            tipCalc.showResult()
        } else {
            tipCalc.customSelected = false;
            const percentBtnClicked = evt.currentTarget.dataset.percent
            let percentBtnElement = document.querySelector("[data-percent='" + percentBtnClicked + "']");
            let previousSelectedElement = document.querySelector("[data-percent='" + tipCalc.selectedPercent + "']");
            previousSelectedElement.classList.remove('percent__btn--selected');
            percentBtnElement.classList.add('percent__btn--selected');
            tipCalc.selectedPercent = percentBtnClicked;
            tipCalc.showResult()
        }

    },

    handlerCustonPercent: function (evt) {
        let customPercentInputValue = tipCalc.customPercentInput.value;
        for (let percentBtnElement of tipCalc.percentBtn) {
            percentBtnElement.classList.remove('percent__btn--selected');
        }
        tipCalc.selectedPercent = customPercentInputValue;
        tipCalc.customSelected = true;
        tipCalc.showResult();
    },

    showResult: function () {
        const percent = parseInt(tipCalc.selectedPercent);
        const total = parseInt(tipCalc.billInput.value);
        const person = parseInt(tipCalc.personInput.value);
        let tipAmount = ((percent * total) / 100) / person;
        let totalAmount = (((percent * total) / 100) + total) / person;
        tipAmount = Math.round(tipAmount * 100) / 100;
        totalAmount = Math.round(totalAmount * 100) / 100;
        tipCalc.billOutput.textContent = '$' + tipAmount
        tipCalc.personOutput.textContent = '$' + totalAmount

    },

    resetResult: function () {
        tipCalc.billOutput.textContent = '$0.00'
        tipCalc.personOutput.textContent = '$0.00'
    }

}