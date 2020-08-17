import List from './list';

export class Catalog extends List {
	constructor(url, container, basket) {
		super(url, container, basket);
		this.basket = basket;
	}
	_handleActions() {
		let cat = document.querySelector(this.container);
		cat.addEventListener('click', evt => {
			if (evt.target.name == 'add') {
				let item = {
					name: evt.target.dataset.name,
					price: +evt.target.dataset.price,
					img: evt.target.dataset.img,
					amount: 1,
					id: evt.target.dataset.id
				}
				this.basket.add(item);
			}
		});
		document.addEventListener('click', evt => {
			let main = document.querySelector('#cart');
			if (evt.target.id == 'hide') {
				main.classList.toggle('hidden');
			}
		})
	}
}

export class Basket extends List {
	constructor(url, container) {
		super(url, container);
		this.sum = 37;
	}
	_handleActions() {
		let cat = document.querySelector(this.container);
		cat.addEventListener('click', evt => {
			if (evt.target.name == 'remove') {
				this.remove(evt.target.dataset.id);
			}
		})
	}
	add(item) {
		let find = this.items.find(el => el.id == item.id);
		if (!find) {
			this.items.push(item);
		} else {
			find.amount++;
		}
		this.sum += item.price;
		this._render();
		document.getElementById("sum").innerHTML = this.sum;
	}
	remove(itemId) {
		let find = this.items.find(el => el.id == itemId);

		if (find.amount > 1) {
			find.amount--;
		} else {
			this.items.splice(this.items.indexOf(find), 1);
		}
		this.sum -= find.price;
		this._render();
		document.getElementById("sum").innerHTML = this.sum;
	}
}