const DB_NAME = 'cardapio_final_v5';

// Carrega os dados salvos ou inicia com padrão
let data = JSON.parse(localStorage.getItem(DB_NAME)) || {
    title: "CARDÁPIO", subtitle: "SABORES DO DIA", day: "Segunda",
    bg: "#121212", text: "#ffffff", primary: "#ffcc00",
    phone: "(47) 99999-9999", address: "Sua Rua aqui, 123",
    ac: "Arroz, Feijão, Fritas, Salada", cr: "Bife Acebolado",
    pr: {p: "15,00", m: "18,00", g: "22,00"}, img: ""
};

// Função para desenhar o cardápio na tela
function render() {
    document.documentElement.style.setProperty('--bg', data.bg);
    document.documentElement.style.setProperty('--text', data.text);
    document.documentElement.style.setProperty('--primary', data.primary);
    document.documentElement.style.setProperty('--badge', data.primary);

    document.getElementById('view-title').innerText = data.title;
    document.getElementById('view-subtitle').innerText = data.subtitle;
    document.getElementById('view-day').innerText = data.day;
    document.getElementById('view-phone').innerText = data.phone;
    document.getElementById('view-address').innerText = data.address;
    
    document.getElementById('view-ac').innerHTML = data.ac.split(',').map(i => i.trim()).join('<br>');
    document.getElementById('view-cr').innerHTML = data.cr.split(',').map(i => i.trim()).join('<br>');

    document.getElementById('view-prices').innerHTML = `
        <div class="price-card"><b>P</b><span>R$ ${data.pr.p}</span></div>
        <div class="price-card"><b>M</b><span>R$ ${data.pr.m}</span></div>
        <div class="price-card"><b>G</b><span>R$ ${data.pr.g}</span></div>
    `;

    const imgCont = document.getElementById('view-img-container');
    imgCont.innerHTML = data.img ? `<img src="${data.img}">` : '';
}

// Função para salvar as alterações do Admin
async function save() {
    data.title = document.getElementById('in-title').value;
    data.subtitle = document.getElementById('in-subtitle').value;
    data.day = document.getElementById('in-day').value;
    data.bg = document.getElementById('in-bg').value;
    data.text = document.getElementById('in-text').value;
    data.primary = document.getElementById('in-primary').value;
    data.ac = document.getElementById('in-ac').value;
    data.cr = document.getElementById('in-cr').value;
    data.pr.p = document.getElementById('in-p').value;
    data.pr.m = document.getElementById('in-m').value;
    data.pr.g = document.getElementById('in-g').value;
    data.phone = document.getElementById('in-phone').value;
    data.address = document.getElementById('in-address').value;

    const file = document.getElementById('in-img').files[0];
    if(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => { data.img = reader.result; finish(); };
    } else { finish(); }
}

function finish() {
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    render();
    alert("Cardápio salvo com sucesso!");
}

// Gera a imagem para download
function download() {
    html2canvas(document.getElementById('capture-area'), { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `cardapio-${data.day}.jpg`;
        link.href = canvas.toDataURL("image/jpeg", 0.95);
        link.click();
    });
}

// Mostra/Esconde o Admin
function toggleAdmin() {
    const p = document.getElementById('admin-panel');
    if(p.style.display === 'none') {
        if(prompt("Senha de acesso:") === "123") {
            p.style.display = 'block';
            document.getElementById('in-title').value = data.title;
            document.getElementById('in-subtitle').value = data.subtitle;
            document.getElementById('in-day').value = data.day;
            document.getElementById('in-bg').value = data.bg;
            document.getElementById('in-text').value = data.text;
            document.getElementById('in-primary').value = data.primary;
            document.getElementById('in-ac').value = data.ac;
            document.getElementById('in-cr').value = data.cr;
            document.getElementById('in-p').value = data.pr.p;
            document.getElementById('in-m').value = data.pr.m;
            document.getElementById('in-g').value = data.pr.g;
            document.getElementById('in-phone').value = data.phone;
            document.getElementById('in-address').value = data.address;
        }
    } else { p.style.display = 'none'; }
}

// Roda ao carregar a página
render();