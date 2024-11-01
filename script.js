document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const gluing = document.getElementById('gluing').value;
    const jointWidth = parseFloat(document.getElementById('jointWidth').value) / 100; // переводим в метры
    const sheetLength = parseFloat(document.getElementById('sheetLength').value);
    const sheetWidth = parseFloat(document.getElementById('sheetWidth').value);

    const areaProduct = length * width;
    const totalArea = areaProduct * quantity;
    const sheetArea = sheetLength * sheetWidth;
    const wasteLoss = (gluing === "Да" ? (quantity - 1) * jointWidth : 0);
    const requiredArea = totalArea + wasteLoss;
    const sheetsNeeded = Math.ceil(requiredArea / sheetArea);

    document.getElementById('areaProduct').innerText = `Площадь изделия (м²): ${areaProduct.toFixed(2)}`;
    document.getElementById('totalArea').innerText = `Общая площадь (м²): ${totalArea.toFixed(2)}`;
    document.getElementById('sheetArea').innerText = `Площадь листа (м²): ${sheetArea.toFixed(2)}`;
    document.getElementById('wasteLoss').innerText = `Потери из-за стыков (м²): ${wasteLoss.toFixed(2)}`;
    document.getElementById('requiredArea').innerText = `Необходимая площадь (м²): ${requiredArea.toFixed(2)}`;
    document.getElementById('sheetsNeeded').innerText = `Количество листов (с запасом): ${sheetsNeeded}`;

    document.getElementById('results').classList.remove('hidden');
});
