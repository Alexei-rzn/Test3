document.getElementById('addPiece').addEventListener('click', function () {
    const productSizes = document.getElementById('productSizes');
    productSizes.innerHTML += `
        <div class="product-size">
            <label>Размер изделия (длина, м):</label>
            <input type="number" class="length" step="0.01" required>
            <label>Размер изделия (ширина, м):</label>
            <input type="number" class="width" step="0.01" required>
        </div>`;
});

document.getElementById('calcForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const piecesCount = parseInt(document.getElementById('pieces').value);
    let totalArea = 0;
    let jointCount = 0;
    let wasteLoss = 0;

    const lengths = Array.from(document.querySelectorAll('.length')).map(input => parseFloat(input.value));
    const widths = Array.from(document.querySelectorAll('.width')).map(input => parseFloat(input.value));

    const sheetLength = parseFloat(document.getElementById('sheetLength').value);
    const sheetWidth = parseFloat(document.getElementById('sheetWidth').value);
    const leafFraction = parseFloat(document.getElementById('leafFraction').value);
    const sheetArea = sheetLength * sheetWidth * leafFraction;

    let totalSize = 0; // Сумма всех размеров
    let maxWaste = 0; // Максимальный перерасход
    let totalWaste = 0; // Общий перерасход

    for (let i = 0; i < piecesCount; i++) {
        const areaProduct = lengths[i] * widths[i];
        totalArea += areaProduct;
        totalSize += lengths[i];

        if (widths[i] > 0.75) {
            jointCount++; // Увеличиваем количество стыков, если ширина больше 0.75 м
        }
    }

    if (document.getElementById('gluing').value === "Да") {
        // Логика при возможности склеивания
        let requiredLength = totalSize;

        if (requiredLength <= sheetLength) {
            wasteLoss = sheetLength - requiredLength; // Потеря в случае, если все помещается в 1 лист
        } else {
            const sheetsNeeded = Math.ceil(requiredLength / sheetLength);
            wasteLoss = (sheetsNeeded * sheetLength) - requiredLength; // Учитываем потери
            jointCount += sheetsNeeded - 1; // Учитываем количество стыков
        }
    } else {
        // Логика при невозможности склеивания
        let totalCuts = 0;
        let leftovers = [];

        for (let i = 0; i < piecesCount; i++) {
            const cutArea = lengths[i];
            const cutWaste = sheetLength - cutArea;

            if (cutWaste >= 0) {
                leftovers.push(cutWaste);
                totalCuts += cutWaste;
            }
        }

        totalWaste = totalCuts;
        jointCount = 0; // Не учитываем стыки в этом случае
        wasteLoss = totalWaste;
    }

    document.getElementById('totalArea').innerText = `Общая площадь (м²): ${totalArea.toFixed(2)}`;
    document.getElementById('sheetsNeeded').innerText = `Количество листов: ${Math.ceil(totalArea / sheetArea)}`;
    document.getElementById('wasteLoss').innerText = `Потери из-за остатков (м²): ${wasteLoss.toFixed(2)}`;
    document.getElementById('jointCount').innerText = `Количество стыков: ${jointCount}`;
    document.getElementById('totalWaste').innerText = `Общий перерасход (мм): ${(totalWaste * 1000).toFixed(2)}`;

    document.getElementById('results').classList.remove('hidden');
});
