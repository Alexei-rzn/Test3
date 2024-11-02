document.getElementById('calcForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const gluing = document.getElementById('gluing').value;
    const jointWidth = parseFloat(document.getElementById('jointWidth').value) / 100; // переводим в метры
    const sheetLength = parseFloat(document.getElementById('sheetLength').value);
    const sheetWidth = parseFloat(document.getElementById('sheetWidth').value);
    const leafFraction = parseFloat(document.getElementById('leafFraction').value);

    const areaProduct = length * width;
    const totalArea = areaProduct * quantity;
    const sheetArea = sheetLength * sheetWidth * leafFraction; // Учитываем выбранную фракцию
    const wasteLoss = (gluing === "Да" ? (quantity - 1) * jointWidth * length : 0); // Стыки считаем по длине
    const requiredArea = totalArea + wasteLoss;

    let sheetsNeeded, neededSheetsDetails = "";

    if (gluing === "Да") {
        // При возможности склеивания
        const totalLength = length * quantity; // Общая длина изделий
        sheetsNeeded = Math.ceil(totalLength / sheetLength);
        const leftover = totalLength % sheetLength; // Остаток

        neededSheetsDetails = `Необходимо целых листов: ${sheetsNeeded} (осталось: ${leftover.toFixed(2)} м)`;

        // Рассчитываем, сколько метров оставшихся можно использовать
        if (leftover > 0) {
            neededSheetsDetails += `. Можно использовать остаток для других изделий.`;
        }
    } else {
        // Без возможности склеивания
        const totalLength = length * quantity; // Общая длина изделий
        let remainingLength = totalLength;

        // Оптимизация для распорки листов
        while (remainingLength > 0) {
            const fullSheets = Math.floor(remainingLength / sheetLength);
            if (fullSheets > 0) {
                neededSheetsDetails += `Необходимо целых листов: ${fullSheets} (длина каждого: ${sheetLength} м) \n`;
                remainingLength -= fullSheets * sheetLength;
            } else {
                neededSheetsDetails += `Необходимо дополнительно: 1 лист ${sheetLength} м для ${remainingLength.toFixed(2)} м.\n`;
                remainingLength = 0; // Завершаем цикл, так как всё учтено
            }
        }

        sheetsNeeded = Math.ceil(totalLength / sheetArea);
    }

    // Обновляем результат на странице
    document.getElementById('areaProduct').innerText = `Площадь изделия (м²): ${areaProduct.toFixed(2)}`;
    document.getElementById('totalArea').innerText = `Общая площадь (м²): ${totalArea.toFixed(2)}`;
    document.getElementById('sheetArea').innerText = `Площадь листа (м², с учетом фракции): ${sheetArea.toFixed(2)}`;
    document.getElementById('wasteLoss').innerText = `Потери из-за стыков (м²): ${wasteLoss.toFixed(2)}`;
    document.getElementById('requiredArea').innerText = `Необходимая площадь (м²): ${requiredArea.toFixed(2)}`;
    document.getElementById('sheetsNeeded').innerText = `Количество листов (с запасом, округленно до 0.25): ${sheetsNeeded.toFixed(2)}`;
    document.getElementById('neededSheetsDetails').innerText = neededSheetsDetails;

    document.getElementById('results').classList.remove('hidden');
});
