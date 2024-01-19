let data = ['bmw','mers','byd','tesla','gm','bugatti','chery'];

function createCar(name) {
  let li = document.createElement('li');
  li.innerHTML = name;
  return li;
};

const frag = document.createDocumentFragment();

const car = document.getElementById('salom');
data.forEach(car => {
  let li = createCar(car);
  frag.appendChild(li);
});

car.appendChild(frag);

// 1 LocalStorage

localStorage.setItem('data', JSON.stringify(data))

// 2 SessionStorage

sessionStorage.setItem('carStorage', JSON.stringify(data));

// 3 Cookies

document.cookie = JSON.stringify(data)

// 4 IndexedDB

const request = window.indexedDB.open("MyTestDatabase", 3);


// 5 Web SQL

const gems = [
  {name: 'ruby', price: 10},
  {name: 'emerald', price: 20},
  {name: 'diamond', price: 30}
];
const store = [
  {gem: 'ruby', amount: 10},
  {gem: 'emerald', amount: 12},
  {gem: 'ruby', amount: 15},
  {gem: 'diamond', amount: 24}
];
const db = window.openDatabase('data', '1.0', 'data', 1*1024*1024);
db.transaction(t => {
  t.executeSql('CREATE TABLE gems (name TEXT, price INTEGER)');
  t.executeSql('CREATE TABLE store (gem TEXT, amount INTEGER)');
  for (let g of gems) {
      t.executeSql('INSERT INTO gems (name, price) VALUES (?, ?)',
      [g.name, g.price]);
  }
  for (let s of store) {
      t.executeSql('INSERT INTO store (gem, amount) VALUES (?, ?)', 
      [s.gem, s.amount]);
  }
}, e => console.error(e));
db.transaction(t => t.executeSql(
  'SELECT g.name, SUM(g.price*s.amount) total FROM gems g ' +
  'INNER JOIN store s ON g.name = s.gem GROUP BY 1', [],
  (t, result) => console.log(result.rows)
)); 

