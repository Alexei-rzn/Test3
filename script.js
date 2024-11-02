// Функция для визуализации укладки
function visualizeLayout(length, width, sheetLength, sheetWidth, quantity) {
    const sheetsLayout = document.getElementById('sheetsLayout');
    sheetsLayout.innerHTML = ''; // Очистить предыдущие данные

    const sheetArea = sheetLength * sheetWidth;    
    const areaProduct = length * width;

    let totalSheets = Math.ceil(quantity * areaProduct / sheetArea); // Общее количество листов
    let placedProducts = 0;

    for (let sheetIndex = 0; sheetIndex < totalSheets; sheetIndex++) {
        const sheetDiv = document.createElement('div');
        sheetDiv.className = 'sheet';
        sheetDiv.style.width = `${sheetLength * 100}px`;
        sheetDiv.style.height = `${sheetWidth * 100}px`;
        
        let offsetX = 0;
        let offsetY = 0;
        
        while (placedProducts < quantity) {
            // Проверка, помещается ли изделие
            if (offsetX + width <= sheetWidth && offsetY + length <= sheetLength) {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.style.width = `${width * 100}px`;
                productDiv.style.height = `${length * 100}px`;
                productDiv.style.left = `${offsetX * 100}px`;
                productDiv.style.top = `${offsetY * 100}px`;

                sheetDiv.appendChild(productDiv);
                offsetX += width; // Перемещаемся по ширине
                placedProducts++;

                // Если не помещается, переходим на следующий уровень
                if (offsetX >= sheetWidth) {
                    offsetX = 0;
                    offsetY += length; // Сдвигаемся вниз по высоте
                }
            } else {
                break; // Выход, если изделие не помещается
            }
        }

        sheetsLayout.appendChild(sheetDiv);
    }
}

document.getElementById('calcForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const gluing = document.getElementById('gluing').value;
    const jointWidth = parseFloat(document.getElementById('jointWidth').value) / 100; 
    const sheetLength = parseFloat(document.getElementById('sheetLength').value);
    const sheetWidth = parseFloat(document.getElementById('sheetWidth').value);
    const leafFraction = parseFloat(document.getElementById('leafFraction').value);

    const areaProduct = length * width; 
    const totalArea = areaProduct * quantity; 
    const sheetArea = sheetLength * sheetWidth * leafFraction; 
    const wasteLoss = (gluing === "Да" ? (quantity - 1) * jointWidth * length : 0); 
    const requiredArea = totalArea + wasteLoss;

    let sheetsNeeded, neededSheetsDetails = "";

    if (gluing === "Да") {
        const totalLength = length * quantity; 
        sheetsNeeded = Math.ceil(totalLength / sheetLength); 
        const leftover = totalLength % sheetLength; 

        neededSheetsDetails = `Необходимо целых листов: ${sheetsNeeded} (осталось: ${leftover.toFixed(3)} м)`;
        if (leftover > 0) {
            neededSheetsDetails += `. Можно использовать остаток для других изделий.`;
        }
    } else {
        const totalLength = length * quantity; 
        let remainingLength = totalLength;

        while (remainingLength > 0) {
            const fullSheets = Math.floor(remainingLength / sheetLength);
            if (fullSheets > 0) {
                neededSheetsDetails += `Необходимо целых листов: ${fullSheets} (длина каждого: ${sheetLength} м) \n`;
                remainingLength -= fullSheets * sheetLength;
            } else {
                neededSheetsDetails += `Необходимо дополнительно: 1 лист ${sheetLength} м для ${remainingLength.toFixed(3)} м.\n`;
                remainingLength = 0; 
            }
        }

        sheetsNeeded = Math.ceil(totalLength / sheetArea);
    }

    // Обновляем результат на странице
    document.getElementById('areaProduct').innerText = `Площадь изделия (м²): ${areaProduct.toFixed(3)}`;
    document.getElementById('totalArea').innerText = `Общая площадь (м²): ${totalArea.toFixed(3)}`;
    document.getElementById('sheetArea').innerText = `Площадь листа (м², с учетом фракции): ${sheetArea.toFixed(3)}`;
    document.getElementById('wasteLoss').innerText = `Потери из-за стыков (м²): ${wasteLoss.toFixed(3)}`;
    document.getElementById('requiredArea').innerText = `Необходимая площадь (м²): ${requiredArea.toFixed(3)}`;
    document.getElementById('sheetsNeeded').innerText = `Количество листов (с запасом, округленно до 0.25): ${sheetsNeeded.toFixed(2)}`;
    document.getElementById('neededSheetsDetails').innerText = neededSheetsDetails;

    document.getElementById('results').classList.remove('hidden');

    // Визуализация укладки
    document.getElementById('layout').classList.remove('hidden');
    visualizeLayout(length, width, sheetLength, sheetWidth, quantity);
});
