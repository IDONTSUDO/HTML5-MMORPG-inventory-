let initialDataQualytyContainer = 1;
let items_setting = {};

// @initialDataQualytyContainer - принимает два состояние 1 это если контайнер должен быть один 2 если их два
let inventory = { x: 6, y: 17 };
let regExpY = new RegExp(/\Y[0-9]?[0-9]/g);
let regExpX = new RegExp(/X+[0-9]?[0-9]/g);
let regExpRotate = new RegExp(/[0-9][0-9][0-9]/g);

let ItemStructures = [];
//структура документа
let speakers_counter = 20;
let windowAll = window.innerWidth % 100;
let attributeSizeShadowHelperWidth;
let attributeSizeShadowHelperHeight;
let newElementShadowToInventory;
let lastCLickItem;
let globalClickOfsetY;
let globalClickOfsetX;
let lastCLickId;
let ShadowElement;
let activeClickElementWithoutMutations;
let ActiveElementWidth;
let ActiveElementHeight;
let globalOffsetXYangleLeft;
let lastActiveShadowX;
let lastActiveShadowY;
let ArrayBuzyCoords = [];
let lastActiveArrayId = [];
// массив последних активных клеток
let winodwTs = window.innerWidth - windowAll;

let shadowDoc = document.getElementById('shadow');

let lastShadowId;
// последний айдишник от которого строилась тень
let fieledHTMLdoc;
let Shadow;
let shadowTransform = 'vertical';

let OFSET_TOP;
let OFSET_LEFT;
// отношение разрешения дисплея текущего устройства в физических пикселях к разрешению в логических (CSS) пикселях.
// крч ширина одного пикселя
let onePixel = window.devicePixelRatio;

let ColonWidth = onePixel * (window.innerWidth / 4.2);
// колонка должна занимать где то 15% пространства, и вот по этому такие костыли 4.2 коофицент подбирался методом рандома

let maxWidth = Math.abs(ColonWidth) > 232.143 ? 232.143 : Math.abs(ColonWidth);
let leftCollonOfsetLeft = window.innerWidth - maxWidth;
let widthAllfieled = window.innerWidth - maxWidth - maxWidth + 'px';

let widthAndHeightOneInventorySquare = (window.innerWidth - maxWidth - maxWidth) / 18.2;

let ClickFuckingOfset = null;

let coordinateActiveArray = [];
// массив с IDшниками на которые нельзя ложить айтем

//
let coordinateActive = [];

let ShadowStatus = false;

let ArrayClear;

let submissions_with_X_Y_ByItems = [];

let removed;

let inventory_user = [
	{
		uuid: '112C8DD8-346B-426E-B06C-75BBA97D#D63',
		item: 'COCACOLA',
		transform: 180,
		areaWidth_Height: { width: 3, height: 3 },
		area: { right_corner_top: { x: 7, y: 0 }, left_corner: { x: 9, y: 2 } },
		img: 'https://torrent-igruha.org/uploads/posts/2016-04/1459773125_may-samer-kar.jpg'
	},
	{
		uuid: 'weq',
		item: 'RED',
		transform: 180,
		areaWidth_Height: { width: 2, height: 3 },
		area: { right_corner_top: { x: 1, y: 0 }, left_corner: { x: 2, y: 2 } },
		img: 'https://torrent-igruha.org/uploads/posts/2016-04/1459773125_may-samer-kar.jpg',
		description: ''
	},
	{
		uuid:"123231321",
		item:"meat",
		transform:180,
		areaWidth_Height:{width:2,height:1},
		area:{h_Height: { width: 2, height: 3 },
		right_corner_top: { x: 5, y: 1 }, left_corner: { x: 6, y: 1 }},
		img:'Meat.png',
		description:"МЯСО утоляет голод"
	}
];
let clickItemState = null;
/**
 * @function пытается вычислить оптимальную ширину, контайнера под инвентарь
 */
function init() {
	fieledHTMLdoc = document.getElementById('fieled');

	fieledHTMLdoc.style.left = maxWidth + 'px';
	fieledHTMLdoc.style.width = widthAllfieled;
}
init();
/**
 * @function инициализирует парвый угол
 */
function right_rowInit() {
	let right_row = document.getElementById('right_row');
	let style = {
		width: maxWidth + 'px',
		height: '100vh',
		position: 'absolute',
		backgroundColor: 'red'
	};
	SetStyles(right_row, style);
}

right_rowInit();
/**
 * @function инициализирует левый угол
 */
function left_rowInit() {
	let left_row = document.getElementById('left_row');
	let style = {
		width: maxWidth + 'px',
		height: '100vh',
		position: 'absolute',
		backgroundColor: 'red',
		left: Math.abs(leftCollonOfsetLeft) + 'px'
	};
	SetStyles(left_row, style);
}
left_rowInit();
/**
 * @function рисует инвентаря, исходя из X и Y заданных в глобале
 */
async function draw() {
	let out = '';
	let m = 0;
	let Oneitem = null;
	for (let i = 0; i < inventory.x; i++) {
		m++;
		for (let item of inventory_user) {
			if (m === item.area.x) {
				item = Oneitem;
			}
		}
		for (let k = 0; inventory.y > k; k++) {
			if (Oneitem != null) {
			}
			ItemStructures.push({ item: `X${k}____Y${i}` });

			out += `<div style="width:${widthAndHeightOneInventorySquare +
				'px'};  height:${widthAndHeightOneInventorySquare +
				'px'}" class="column" id="X${k}____Y${i}" x="${k}" y="${i}" ></div>`;
		}
	}
	document.querySelector('#fieled').innerHTML = out;
	document.querySelectorAll('.column').forEach(function(element) {
		element.onmousemove = dragColumnOne;
	});
}

function dragColumnOne(e) {
	if (lastCLickItem != undefined) {
	}
	if (lastCLickId != undefined) {
		let idActive = e.target.id;
		let documentDropshadowLeftAngle = structuresHTMLAndCoordinats.find(isShadow); // undefined, не найдено
		// массив HTML документов, вложенных на точке e.x e.y
		let ArrayHTMLelement = document.elementsFromPoint(e.x - OFSET_TOP, e.y - OFSET_LEFT);
		for (let HTMLdoc of ArrayHTMLelement) {
			if (HTMLdoc.classList.contains('column')) {
				if (lastShadowId === HTMLdoc.id) {
					return;
				} else {
					Shadow = HTMLdoc;
					lastShadowId = HTMLdoc.id;
				}
			}
		}

		let resultX = parseInt(Shadow.getAttribute('x')) + parseInt(attributeSizeShadowHelperWidth) + 1;
		let resultY = parseInt(Shadow.getAttribute('y')) + parseInt(attributeSizeShadowHelperHeight);
		let normalizX = resultX - inventory.y;
		if (isNaN(resultX)) {
			return;
		} else {
			let resultAreaCalculationX = inventory.y + parseInt(normalizX) - 1;
			if (resultAreaCalculationX <= inventory.y && resultY <= inventory.x) {
				if (Shadow) {
					ShadowStatus = false;
					let rightAlgol = Shadow;
					let leftAngelId = `X${parseInt(Shadow.getAttribute('x')) -
						1 +
						parseInt(attributeSizeShadowHelperWidth)}____Y${parseInt(Shadow.getAttribute('y')) -
						1 +
						parseInt(attributeSizeShadowHelperHeight)}`;

					let leftAlgol = document.getElementById(`${leftAngelId}`);

					let CoordsleftAlgol = getCoords(leftAlgol);
					let CoordsRightAlgol = getCoords(rightAlgol);

					let Y_left = leftAngelId.match(regExpY);
					let X_left = leftAngelId.match(regExpX);
					let X_right = parseInt(Shadow.getAttribute('x'));
					let Y_right = parseInt(Shadow.getAttribute('y'));
					let numLeftY = parseInt(Y_left[0].slice(1, 2));
					let numLeftX = parseInt(X_left[0].slice(1, 2));
					let FinalMatMatrixItem = [];
					let items = [];
					let helperleftAlgol = leftAlgol.getAttribute('x');
					let helperMathMaxAlgolWidth = helperleftAlgol - attributeSizeShadowHelperWidth;

					for (Y_right; numLeftY >= Y_right; Y_right++) {
						items.push(Y_right);
					}
					let elem = 0;
					while (elem < items.length) {
						for (let i = helperMathMaxAlgolWidth; helperleftAlgol > i; i++) {
							FinalMatMatrixItem.push(`X${i + 1}Y${items[elem]}`);
						}
						elem++;
					}
					for (let elem = 0; coordinateActive.length > elem; elem++) {
						if (FinalMatMatrixItem.includes(coordinateActive[elem])) {
							ShadowStatus = true;
						}
					}
					
					let style = {
						top: CoordsRightAlgol.top + 'px',
						left: CoordsRightAlgol.left + 'px',
						right: CoordsleftAlgol.right + 'px',
						bottom: CoordsleftAlgol.bottom,
						position: 'absolute',
						height: CoordsleftAlgol.bottom - CoordsRightAlgol.top + 'px',
						width: CoordsleftAlgol.right - CoordsRightAlgol.left + 'px',
						backgroundColor: ShadowStatus ? '#ff000036' : '#00ff5136'
					};
					SetStyles(shadowDoc, style);
				}
			} else {
				return;
			}
			let activeClickElement = document.getElementById(`${idActive}`);
			let coordinats = getCoords(activeClickElement);
		}
	}
}

document.getElementById('shadow').addEventListener('mousemove', dragColumnOne);
/**
 * @function рисует айтемы, исходя из их свойств  в которых существует правый угол и левый угол.
 * она берет, и ищет все DIV с айдишниками этих углов. Как только находит. Производит математические манипуляции
 * и преобразует на основе их. Айтем инвентаря.
 */
function drawIneventoryItem() {
	for (let el of inventory_user) {
		// Поиск углов
		let right_corner_top = document.getElementById(
			`X${el.area.right_corner_top.x}____Y${el.area.right_corner_top.y}`
		);

		let left_corner = document.getElementById(`X${el.area.left_corner.x}____Y${el.area.left_corner.y}`);

		coordinateActiveArray.push({
			item: {
				uuid: el.uuid,
				right: `X${el.area.right_corner_top.x}____Y${el.area.right_corner_top.y}`,
				left: `X${el.area.left_corner.x}____Y${el.area.left_corner.y}`,
				x: el.areaWidth_Height.height,
				y: el.areaWidth_Height.width
			}
		});
		let CoordinateRight = getCoords(right_corner_top);
		let CoordinateLeft = getCoords(left_corner);
		let itemCreated = document.createElement('img');
		itemCreated.setAttribute(
			'style',
			`border: 1px solid black; width:100%;height:100%; background-color: #cccccc; position: absolute;
			`
		);
		// записываем размеры, они нужны для рендеринга тени
		itemCreated.setAttribute('height', `${el.areaWidth_Height.height}`);
		itemCreated.setAttribute('width', `${el.areaWidth_Height.width}`);
		itemCreated.id = el.uuid;
		let style = {
			height: CoordinateLeft.bottom - CoordinateRight.top + 'px',
			width: CoordinateLeft.right - CoordinateRight.left + 'px',
			left: CoordinateRight.left + 'px',
			top: CoordinateRight.top + 'px',
			transform: `rotate(${el.transform}deg)`
		};
		SetStyles(itemCreated, style);
		itemCreated.addEventListener('mousemove', dragColumnOne);

		document.body.appendChild(itemCreated);
	}
}

/**
 * @function нормализует fieled
 */
function initNormalized() {
	let documentLastItemHtml = document.getElementById(`${ItemStructures[ItemStructures.length - 1].item}`);

	let coordinatNormalized = getCoords(documentLastItemHtml);
	let resultOfsetCollumnInventoryFromLeftRow =
		Math.abs(coordinatNormalized.right) + maxWidth - Math.abs(window.innerWidth);
	let marginResultOfset = Math.abs(resultOfsetCollumnInventoryFromLeftRow) / 2;
	let LeftfieledHTMLdoc = fieledHTMLdoc.style.left;
	let aaa = Math.abs(LeftfieledHTMLdoc.slice(0, -2)) + marginResultOfset + 'px';

	fieledHTMLdoc.style.left = aaa;

	let coordsfieled = getCoords(fieledHTMLdoc);
	let cente = coordsfieled.height - window.innerHeight;
	let topOfset = Math.abs(cente) / 2;
	fieledHTMLdoc.style.top = topOfset + 'px';
}
draw().then(initNormalized());

function visibelClick() {
	ElementClick = this;
}
/**
 * @param  {HTMLelement} elem 
 * @return Координаты HTML элемента
 */
function getCoords(elem) {
	if (elem !== null || undefined) {
		let box = elem.getBoundingClientRect();
		return {
			top: box.top,
			left: box.left,
			bottom: box.bottom,
			height: box.height,
			right: box.right,
			width: box.width,
			x: box.x,
			y: box.y
		};
	}
}
/**
 * @param  {Array HTML айдищников} item
 * @function  ищет координаты по документу, каждого id
 */
function getStructurCoordinarData(item) {
	let coordinatesStructur = [];
	item.forEach((elem) => {
		let el = document.getElementById(`${elem.item}`);
		coordinatesStructur.push({ el_coords: getCoords(el), item: elem.item });
	});
	return coordinatesStructur;
}
draw();

let structuresHTMLAndCoordinats = getStructurCoordinarData(ItemStructures);

/**
 * @param  {елемент интерпретируемого массив} element
 * @param  {его индекс} index
 * @param  {сам массив} array
 * @function озвращает данные о левом угле, подставляемой фикстуры инвентаря
 */
function isShadow(element, index, array) {
	if (element.item === globalOffsetXYangleLeft) {
		return element;
	}
}

drawIneventoryItem();
document.querySelector('body').addEventListener(
	'mousemove',
	throttle(function(e) {
		if (lastCLickItem) {
			let coord = getCoords(lastCLickItem);
			lastCLickItem.style.top = e.y - OFSET_LEFT + 'px';
			lastCLickItem.style.left = e.x - OFSET_TOP + 'px';
		}
	}, 0)
);

document.body.onmousedown = function(e) {
	if (e.target.nodeName === 'IMG') {
		if (e.target != lastCLickItem) {
			btnCode = e.button;
			let htmlElementTargetId = e.target;

			switch (btnCode) {
				case 0:
					let coords = getCoords(e.target);
					OFSET_LEFT = coords.height / 2;
					OFSET_TOP = coords.width / 2;
					attributeSizeShadowHelperWidth = htmlElementTargetId.getAttribute('width');
					attributeSizeShadowHelperHeight = htmlElementTargetId.getAttribute('height');
					lastCLickId = htmlElementTargetId.id;
					htmlElementTargetId.style.zIndex = 10;
					lastCLickItem = document.getElementById(`${htmlElementTargetId.id}`);
					ActiveElementClickCoords = getCoords(lastCLickItem);
					ActiveElementWidth = ActiveElementClickCoords.height;
					ActiveElementHeight = ActiveElementClickCoords.width;
					let ArrayClear = [];
					submissions_with_X_Y_ByItems.forEach((element, i) => {
						if (element.uuid === htmlElementTargetId.id) {
							removed = submissions_with_X_Y_ByItems[i].submissions.splice(0);
						}
					});
					removed.forEach((element, i) => {
						for (let index = 0; coordinateActive.length > index; index++) {
							if (coordinateActive[index] === element) {
								coordinateActive.splice(index, 1);
							}
						}
					});

					break;

				case 1:
					console.log('Нажата средняя кнопка или колёсико.');
					break;

				case 2:
					console.log('Нажата правая кнопка.');

					break;

				default:
					console.log('Неопределённое событие: ' + btnCode);
			}
		}
	}
};
/**
 * @function тротлинг самый обычный
 * @param  {принимает функцию} fn
 * @param  {и задержку между вызовами этой функции} delay
 */
function throttle(fn, delay) {
	var timeout = null;
	return function throttledFn() {
		window.clearTimeout(timeout);
		var ctx = this;
		var args = Array.prototype.slice.call(arguments);
		timeout = window.setTimeout(function callThrottledFn() {
			fn.apply(ctx, args);
		}, delay);
	};
}

document.addEventListener('wheel', (e) => wheelActiveDocs(e));

/**
 * @param  {стандартный DON event} e
 * @function оно должно вращать элемент
 */
function wheelActiveDocs(e) {
	if (lastCLickItem === undefined) {
		return;
	} else {
		let kindofNumber = Math.sign(e.deltaY);
		if (kindofNumber === 1) {
			let rotate = lastCLickItem.style.transform;
			console.log(rotate);
			// lastCLickItem.style.transform = 'rotate(90deg)';
		}
		if ((kindofNumber = -1)) {
			console.log(-200);
		}
	}
}

/**
 * @param  {html} elem
 * @param  {ValidDomStyleObject} style
 * @function изменят стилизацию входящего элемента
 */
function SetStyles(elem, style) {
	Object.assign(elem.style, style);
}
/**
 * @function у нас как бы активный айдишники записываются так right:X_Y,left:X_Y 
 * и эта функция, отвечает за то что бы преобразовать этот массив так что бы  заполнить пробелы 
 * которые возникают 
 * @param { массив айдишников } arrayID 
 */
function CoordinateNormalize(arrayID) {
	arrayID.forEach((element) => {
		let x_right = element.item.right.match(regExpX);
		let y_right = element.item.right.match(regExpY);
		let x_left = element.item.left.match(regExpX);
		let y_left = element.item.left.match(regExpY);

		let X_rightAlgol = parseInt(x_right[0].slice(1, 2));
		let Y_rightAlgol = parseInt(y_right[0].slice(1, 2));
		let X_leftAlgol = parseInt(x_left[0].slice(1, 2));
		let Y_leftAlgol = parseInt(y_left[0].slice(1, 2));
		let items = [];

		let submissions = [];
		for (Y_rightAlgol; Y_leftAlgol >= Y_rightAlgol; Y_rightAlgol++) {
			items.push(Y_rightAlgol);
		}

		let FinalMatMatrixItem = [];
		let helperleftAlgol = X_leftAlgol;
		let helperMathMaxAlgolWidth = helperleftAlgol - element.item.x;

		let elem = 0;
		while (elem < items.length) {
			for (let i = helperMathMaxAlgolWidth; helperleftAlgol > i; i++) {
				submissions.push(`X${i + 1}Y${items[elem]}`);
				coordinateActive.push(`X${i + 1}Y${items[elem]}`);
			}
			elem++;
		}

		submissions_with_X_Y_ByItems.push({ uuid: element.item.uuid, submissions });
	});
}

CoordinateNormalize(coordinateActiveArray);

function debugLog(DebugText) {
	let log = document.getElementById('log');
	let newLog = document.createElement('div');
	newLog.style.position = 'relative';
	newLog.innerHTML = `<strong>${DebugText}</strong> `;
	document.body.append(newLog);
}
function conversionXY(X_left, Y_left, X) {}

/**
 * @function чистит глобальный массив coordinateActive от айдишников которые уже не участвуют 
 * в формировании тени
 * @param  {Массив айди что нужно почистить} ArrayClear
 */
function clearActiveArray(ArrayClear) {}
document.addEventListener(
	'contextmenu',
	function(e) {
		e.preventDefault();
	},
	false
);
