const DB_KEY = 'cardapio_v19_final';

// 1. Carregamento inicial de dados (ATUALIZADO)
let data = JSON.parse(localStorage.getItem(DB_KEY)) || {
    title: "CARDÁPIO",
    subtitle: "SABORES DO DIA",
    day: "Segunda",
    footerLabel: "PEDIDOS NO WHATSAPP",
    bg: "#A81752",       // Alterado para Vinho
    text: "#ffffff",
    primary: "#F4CC69",  // Alterado para Bege/Dourado
    phone: "(47) 98421-7160",
    address: "Rua Principal, 123",
    ac: "Arroz, Feijão, Fritas",
    cr: "Carne, Frango",
    pr: { p: "15,00", m: "18,00", g: "22,00" },
    img: ""
};

// 2. Função para atualizar a visualização
function render() {
    document.documentElement.style.setProperty('--bg', data.bg);
    document.documentElement.style.setProperty('--text', data.text);
    document.documentElement.style.setProperty('--primary', data.primary);

    document.getElementById('view-title').innerText = data.title;
    document.getElementById('view-subtitle').innerText = data.subtitle;
    document.getElementById('view-day').innerText = data.day;
    document.getElementById('view-footer-label').innerText = data.footerLabel;
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
    imgCont.innerHTML = data.img ? `<img src="${data.img}" style="width:100%; height:100%; object-fit:cover;">` : '';
}

// 3. Salvar alterações
async function save() {
    data.title = document.getElementById('in-title').value;
    data.subtitle = document.getElementById('in-subtitle').value;
    data.day = document.getElementById('in-day').value;
    data.footerLabel = document.getElementById('in-footer-label').value;
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
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            data.img = reader.result;
            finishSave();
        };
    } else {
        finishSave();
    }
}

function finishSave() {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    render();
    alert("Alterações salvas com sucesso!");
}

// 4. Download com nome dinâmico
function downloadImage(type) {
    const area = document.getElementById('capture-area');
    const diaSemana = data.day || "Dia";
    
    if (type === 'feed') area.classList.add('feed-mode');

    html2canvas(area, { scale: 1, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        if (type === 'feed') {
            link.download = `Cardapio-feed-${diaSemana}.jpg`;
        } else {
            link.download = `Cardapio-Stories-Status-${diaSemana}.jpg`;
        }
        link.href = canvas.toDataURL("image/jpeg", 0.9);
        link.click();
        area.classList.remove('feed-mode');
    });
}

// 5. Toggle Admin e Preenchimento Automático
function toggleAdmin() {
    const panel = document.getElementById('admin-panel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        if (prompt("Digite a senha:") === "123") {
            panel.style.display = 'block';
            document.getElementById('in-title').value = data.title;
            document.getElementById('in-subtitle').value = data.subtitle;
            document.getElementById('in-day').value = data.day;
            document.getElementById('in-footer-label').value = data.footerLabel;
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
    } else {
        panel.style.display = 'none';
    }
}

render();