const tipCalc = {
    init: function () {
        const anyInput = document.querySelectorAll('.input-element');
        for (let anyInputElement of anyInput) {
            anyInputElement.addEventListener("input", tipCalc.handlerFormOutput);
        }

        const percentBtn = document.querySelectorAll('.percent__btn');
        for (let percentBtnElement of percentBtn) {
            percentBtnElement.addEventListener("click", tipCalc.handlerSelectedPercent);
        }
        document.querySelector('.custom-percentage').addEventListener("input", tipCalc.handlerCustonPercent);
    },

    billInput: document.querySelector('.userInput__bill__input--amount'),

    personInput: document.querySelector('.userInput__peopleCount__select--input'),

    selectedPercent: 15,

    customPercentInput: document.querySelector('.custom-percentage'),

    billOutput: document.querySelector('.output__amount__tip'),

    personOutput: document.querySelector('.output__amount__total'),

    handlerFormOutput: function (evt) {
        tipCalc.billOutput.value = tipCalc.billInput.value
        tipCalc.personOutput.value = tipCalc.personInput.value

    },

    handlerSelectedPercent: function (evt) {
        const percentBtnClicked = evt.currentTarget.dataset.percent
        tipCalc.customPercentInput.value = ''
        let percentBtnElement = document.querySelector("[data-percent='" + percentBtnClicked + "']");
        let previousSelectedElement = document.querySelector("[data-percent='" + tipCalc.selectedPercent + "']");
        previousSelectedElement.classList.remove('percent__btn--selected');
        percentBtnElement.classList.add('percent__btn--selected');
        tipCalc.selectedPercent = percentBtnClicked;
    },
    handlerCustonPercent: function (evt) {

        let customPercentInputValue = tipCalc.customPercentInput.value
        tipCalc.selectedPercent = customPercentInputValue
    },
}