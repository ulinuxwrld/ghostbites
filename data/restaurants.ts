export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  image: string;
  deliveryTime: string;
  rating: number;
  description: string;
  menu: MenuItem[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger do Vazio Existencial',
    category: 'Hambúrgueres & Dopamina',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-25 min',
    rating: 4.9,
    description: 'Hambúrgueres artesanais recheados de expectativas e queijo derretido abstrato.',
    menu: [
      { id: 'b1', name: 'X-Ansiedade Duplo', description: 'Dois hambúrgueres de pura pressa, cheddar cremoso do inconsciente e maionese verde da esperança.' },
      { id: 'b2', name: 'Smash Compulsão', description: 'Hambúrguer prensado na chapa quente do tédio com cebola crispy e picles de realidade.' },
      { id: 'b3', name: 'Bacon da Meia-Noite', description: 'Muito bacon crocante projetado para acalmar pensamentos intrusivos após as 23h.' },
      { id: 'b4', name: 'Giga Dopamina Burger', description: 'Três carnes imaginárias, quádruplo queijo e molho especial que cura frustração momentânea.' },
      { id: 'b5', name: 'Chicken Crise Existencial', description: 'Frango empanado super crocante recheado com queijo e perguntas sem resposta.' },
      { id: 'b6', name: 'Monster Insônia', description: 'Pão brioche, hambúrguer de 200g, anéis de cebola e molho barbecue sem calorias.' },
      { id: 'b7', name: 'X-Gula Etérea', description: 'Para quando você não tem fome, mas a sua boca quer mastigar algo a qualquer custo.' },
      { id: 'b8', name: 'Veggie Ilusão', description: 'Hambúrguer de grão-de-bico virtual para quem quer salvar o planeta e a própria conta bancária.' },
      { id: 'b9', name: 'Combo Síndrome do Impulso', description: 'Hambúrguer + Batata Fictícia + Refrigerante de Ar Comprimido.' },
      { id: 'b10', name: 'Mini Smash Solidão', description: 'Um burger individual compacto para quando você só quer um abraço em forma de pão.' }
    ]
  },
  {
    id: '2',
    name: 'Pizzaria Quadrado do Círculo',
    category: 'Pizzas & Ilusões',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '20-30 min',
    rating: 4.8,
    description: 'Massas de longa fermentação mental que aconchegam a alma no fim do dia.',
    menu: [
      { id: 'p1', name: 'Calabresa do Arrependimento', description: 'Calabresa fatiada fina com bastante cebola e zero azia no dia seguinte.' },
      { id: 'p2', name: 'Quatro Queijos do Fechamento de Fatura', description: 'Gorgonzola, provolone, mozarela e catupiry totalmente isentos de cobrança no cartão.' },
      { id: 'p3', name: 'Margherita Iluminada', description: 'Manjericão fresco colhido no jardim da serenidade com tomate pelado etéreo.' },
      { id: 'p4', name: 'Frango com Catupiry Abstrato', description: 'O clássico brasileiro que resolve 99% dos dias difíceis no trabalho.' },
      { id: 'p5', name: 'Pepperoni do Stress', description: 'Fatias apimentadas de pepperoni simbólico para queimar a raiva do expediente.' },
      { id: 'p6', name: 'Portuguesa sem Consequências', description: 'Ovo, presunto, cebola, ervilha e azeitona preta sem inchaço abdominal.' },
      { id: 'p7', name: 'Pizza Doce: Nutella com Pensamento Intrusivo', description: 'Base crocante coberta com creme de avelã imaginário e morangos frescos.' },
      { id: 'p8', name: 'Borda Recheada de Paz Interior', description: 'Adicional de borda vulcanizada recheada com alívio financeiro.' },
      { id: 'p9', name: 'Cogumelos do Nirvana', description: 'Shimeji e paris salteados na manteiga espiritual com azeite trufado fictício.' },
      { id: 'p10', name: 'Meia Aconchego, Meia Redenção', description: 'Dois sabores à sua escolha para quem nunca consegue se decidir no iFood.' }
    ]
  },
  {
    id: '3',
    name: 'Sushibar Zen Dopamina',
    category: 'Japonesa & Consciência',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '25-40 min',
    rating: 4.9,
    description: 'Niguiris, uramakis e hots crocantes preparados com absoluta calma mental.',
    menu: [
      { id: 's1', name: 'Hot Roll da Gratidão (10 un)', description: 'Empanado e frito na hora do alívio, coberto com taraê e gergelim.' },
      { id: 's2', name: 'Temaki de Salmão Ilusório', description: 'Cone de nori super crocante recheado com bastante salmão fresco e cream cheese etéreo.' },
      { id: 's3', name: 'Combo Nirvana (20 peças)', description: 'Sashimis, niguiris e uramakis variados para uma meditação gastronômica profunda.' },
      { id: 's4', name: 'Uramaki Ebi Tempura Abstrato', description: 'Camarão empanado crocante envolvido por arroz temperado e lâminas de abacate.' },
      { id: 's5', name: 'Sashimi de Salmão Espiritual (12 fatias)', description: 'Cortes perfeitos e macios de salmão que derretem na boca sem pesar no bolso.' },
      { id: 's6', name: 'Jou de Geleia de Pimenta Fictícia', description: 'Lâmina de salmão envolvendo cream cheese e toque doce-picante de alívio.' },
      { id: 's7', name: 'Yakisoba do Equilíbrio', description: 'Macarrão oriental salteado com legumes frescos e tiras de carne sublimada.' },
      { id: 's8', name: 'Sunomono da Calmaria', description: 'Salada de pepino agridoce refrescante para desacelerar batimentos cardíacos.' },
      { id: 's9', name: 'Temaki sem Arroz (Fit Mente)', description: 'Apenas salmão, cebolinha e cream cheese para quem quer economizar dinheiro e carbs.' },
      { id: 's10', name: 'Harumaki Doce de Doce de Leite', description: 'Rolinho primavera crocante e quentinho para adoçar a noite.' }
    ]
  },
  {
    id: '4',
    name: 'Taco Bellum: A Guerra da Fome',
    category: 'Mexicana & Catarse',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-30 min',
    rating: 4.7,
    description: 'Comida mexicana apimentada para incendiar o tédio e expulsar a ansiedade.',
    menu: [
      { id: 'm1', name: 'Burrito Carga de Dopamina', description: 'Tortilla gigante recheada com carne moída temperada, guacamole, sour cream e feijão.' },
      { id: 'm2', name: 'Nachos Suprema Ilusão', description: 'Tortilhas crocantes cobertas com queijo derretido, jalapeños e pico de gallo.' },
      { id: 'm3', name: 'Tacos Crocantes de Pura Vontade (3 un)', description: 'Conchas de milho crocantes recheadas com frango desfiado e cheddar.' },
      { id: 'm4', name: 'Quesadilla do Descarrego', description: 'Tortilla dourada na chapa com muito queijo derretido e pimentões salteados.' },
      { id: 'm5', name: 'Bowl Mexicano da Clareza', description: 'Arroz temperado, feijão preto, milho, guacamole, carne e salsa fresca.' },
      { id: 'm6', name: 'Churros de Doce de Leite Etéreo', description: 'Churros polvilhados com açúcar e canela acompanhados de Doce de Leite.' },
      { id: 'm7', name: 'Fajitas de Carne Abstrata', description: 'Tiras de carne grelhadas com cebola e pimentão acompanhadas de tortilhas quentinhas.' },
      { id: 'm8', name: 'Chimichanga da Superação', description: 'Burrito frito crocante por fora e absurdamente cremoso por dentro.' },
      { id: 'm9', name: 'Molho Guacamole da Paz', description: 'Porção extra de guacamole com abacates perfeitamente maduros do consciente.' },
      { id: 'm10', name: 'Jalapeño Poppers Fictícios', description: 'Pimentas jalapeño recheadas com cream cheese e empanadas.' }
    ]
  },
  {
    id: '5',
    name: 'Pastelaria O Vento É O Recheio',
    category: 'Pastéis & Crocância',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 4.9,
    description: 'Pastéis de feira de 30cm super crocantes que espantam qualquer tristeza.',
    menu: [
      { id: 'pas1', name: 'Pastel de Carne com Ovo da Feira', description: 'O rei da feira de domingo: massa sequinha, carne bem temperada e ovo cozido.' },
      { id: 'pas2', name: 'Pastel de Queijo que Estica 1 Metro', description: 'Massa crocante com recheio infinito de mozarela puxa-puxa sem calorias.' },
      { id: 'pas3', name: 'Pastel Frango com Catupiry Original', description: 'Recheio abundante de frango desfiado bem molhadinho com requeijão.' },
      { id: 'pas4', name: 'Pastel de Pizza das 3h da Manhã', description: 'Queijo, presunto, tomate picadinho e orégano em abundância.' },
      { id: 'pas5', name: 'Pastel Doce: Romeu e Julieta', description: 'Goiabada cremosa com queijo minas derretido na massa crocante.' },
      { id: 'pas6', name: 'Pastel de Bacalhau da Nobreza', description: 'Bacalhau desfiado temperado com azeite, azeitonas e salsinha.' },
      { id: 'pas7', name: 'Pastel de Palmito Cremoso', description: 'Palmito macio com molho branco leve e ervas finas.' },
      { id: 'pas8', name: 'Pastel Doce de Banoffee', description: 'Banana, doce de leite e toque de canela polvilhado com açúcar.' },
      { id: 'pas9', name: 'Caldo de Cana Imaterial (500ml)', description: 'Caldo de cana trincando de gelado com limão para acompanhar.' },
      { id: 'pas10', name: 'Combo Feira da Madrugada', description: '2 Pastéis grandes + 1 Caldo de Cana com limão fictício.' }
    ]
  },
  {
    id: '6',
    name: 'Cantina Mamma Mente',
    category: 'Italiana & Conforto',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '25-35 min',
    rating: 4.8,
    description: 'Massas artesanais e molhos aveludados para abraçar o estômago e a mente.',
    menu: [
      { id: 'it1', name: 'Fettuccine Alfredo da Alma', description: 'Massa fresca envolvida em molho aveludado de manteiga, creme e parmesão grana padano.' },
      { id: 'it2', name: 'Lasanha à Bolonhesa da Vovó', description: 'Camadas intercaladas de massa, molho de carne bem apurado e muito queijo.' },
      { id: 'it3', name: 'Nhoque da Fortuna de R$ 0,00', description: 'Nhoque de batata leve como uma nuvem com molho rústico de tomates frescos.' },
      { id: 'it4', name: 'Spaghetti à Carbonara Tradicional', description: 'Gema de ovo, guanciale crocante, queijo pecorino e pimenta do reino moída na hora.' },
      { id: 'it5', name: 'Ravioli de Costela com Molho Roti', description: 'Massa recheada com costela assada desfiava ao molho encorpado de ervas.' },
      { id: 'it6', name: 'Polpette ao Molho Sugo (4 un)', description: 'Alpôndegas de carne artesanais recheadas com queijo e cobertas de molho de tomate.' },
      { id: 'it7', name: 'Pão de Alho Garlic Bread da Casa', description: 'Pão italiano quentinho com manteiga de alho e ervas gratinado.' },
      { id: 'it8', name: 'Cannoli Siciliano Fictício', description: 'Massa crocante recheada com creme de ricotta, gotas de chocolate e pistache.' },
      { id: 'it9', name: 'Tiramisù da Serenidade', description: 'Sobremesa clássica com biscoito champanhe banhado em café e creme de mascarpone.' },
      { id: 'it10', name: 'Risoto de Funghi Trufado', description: 'Arroz arbóreo cremoso com cogumelos salteados e azeite de trufas brancas.' }
    ]
  },
  {
    id: '7',
    name: 'Doceria Sugar Crash Zero',
    category: 'Doces & Sobremesas',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 5.0,
    description: 'TORTAS, BROWNES E BRIGADEIROS. Toda a glicose mental sem nenhuma glicose real.',
    menu: [
      { id: 'd1', name: 'Fatipia de Torta Holandesa', description: 'Creme leve de baunilha, cobertura de ganache de chocolate e biscoitos cobertos.' },
      { id: 'd2', name: 'Brownie de Chocolate 70% com Gelato', description: 'Brownie denso e fofinho servido com uma bola imaginária de sorvete de baunilha.' },
      { id: 'd3', name: 'Brigadeiro Gourmet de Colher (200g)', description: 'Brigadeiro feito com chocolate nobre e confeitos crocantes para comer assistindo série.' },
      { id: 'd4', name: 'Red Velvet Cake com Cream Cheese', description: 'Bolo aveludado vermelho com recheio cremoso e levemente azudinho.' },
      { id: 'd5', name: 'Pudim sem Furinhos Perfeito', description: 'O pudim de leite condensado mais lisinho e com calda de caramelo dourada.' },
      { id: 'd6', name: 'Coxinha de Morango com Brigadeiro', description: 'Morango inteiro e suculento envolto por uma camada generosa de brigadeiro.' },
      { id: 'd7', name: 'Cheesecake de Frutas Vermelhas', description: 'Base de biscoito, creme salgado-doce e geleia artesanal de frutas vermelhas.' },
      { id: 'd8', name: 'Copo da Felicidade Dopaminérgica', description: 'Camadas de brownie, brigadeiro branco, Nutella e morangos frescos.' },
      { id: 'd9', name: 'Petit Gâteau Quentinho', description: 'Bolo de chocolate com recheio derretido que escorre ao cortar.' },
      { id: 'd10', name: 'Macarons Sortidos (6 unidades)', description: 'Biscoitos franceses de amêndoas recheados com pistache, chocolate e frutas.' }
    ]
  },
  {
    id: '8',
    name: 'Açaí da Iluminação',
    category: 'Açaí & Refrescância',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-25 min',
    rating: 4.9,
    description: 'Copo de açaí puro do norte recheado com todos os adicionais que você desejar.',
    menu: [
      { id: 'ac1', name: 'Copo Turbinado de 700ml', description: 'Açaí cremoso com leite em pó, leite condensado, paçoca e morango.' },
      { id: 'ac2', name: 'Açaí Fit Consciência (500ml)', description: 'Açaí batido puro com banana, granola artesanal e mel orgânico.' },
      { id: 'ac3', name: 'Bowl Supremo de Ninho e Nutella', description: 'Camadas generosas de creme de Ninho, Nutella pura, banana e M&Ms.' },
      { id: 'ac4', name: 'Açaí com Cupuaçu Duo', description: 'Metade açaí tradicional, metade creme de cupuaçu azudinho e refrescante.' },
      { id: 'ac5', name: 'Barca de Açaí da Galáxia', description: 'Servida em barca com 1kg de açaí, biscoitos, chocolates e frutas cortadas.' },
      { id: 'ac6', name: 'Copo Kids Alegria', description: 'Açaí cremoso com confeti colorido, jujuba e cobertura de morango.' },
      { id: 'ac7', name: 'Açaí com Ovomaltine Crocantes', description: 'Bastante Ovomaltine misturado no açaí para dar aquela textura crocante.' },
      { id: 'ac8', name: 'Smoothie Energético de Açaí', description: 'Batido com guaraná, morango e água de coco para revigorar as energias.' },
      { id: 'ac9', name: 'Adicional de Paçoca Infinita', description: 'Porção extra de paçoca esfarelada para cobrir todo o seu copo.' },
      { id: 'ac10', name: 'Creme de Pitaya Rosa Etéreo', description: 'Creme cor-de-rosa super fotogênico com chia e kiwi fatiado.' }
    ]
  },
  {
    id: '9',
    name: 'Green Mind: Fit Consciência',
    category: 'Saudável & Fit',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-30 min',
    rating: 4.6,
    description: 'Comida leve, limpa e funcional para alimentar o corpo e tranquilizar a consciência.',
    menu: [
      { id: 'f1', name: 'Salada Poke de Salmão e Abacate', description: 'Base de arroz integral, salmão em cubos, edamame, manga, gergelim e molho ponzu.' },
      { id: 'f2', name: 'Wrap de Frango Grelhado e Ricota', description: 'Massa integral leve recheada com peito de frango, creme de ricota e folha verdes.' },
      { id: 'f3', name: 'Bowl de Quinoa com Legumes Assados', description: 'Quinoa temperada, abóbora assada, grão-de-bico crocante e molho de tahine.' },
      { id: 'f4', name: 'Omelete de Claras com Espinafre', description: 'Omelete fofinha recheada com espinafre, tomate cereja e queijo cotage.' },
      { id: 'f5', name: 'Sopa Detox de Abóbora com Gengibre', description: 'Creme quentinho e aveludado de abóbora cabotiá com leve toque picante.' },
      { id: 'f6', name: 'Marmita Fit: Tiras de Mignon com Batata Doce', description: 'O clássico dos treinos: filé mignon salteado e purê de batata doce.' },
      { id: 'f7', name: 'Salada Caesar com Crispy de Tofu', description: 'Mix de folhas, molho caesar leve, croutons integrais e tofu grelhado.' },
      { id: 'f8', name: 'Suco Verde Pura Energia (500ml)', description: 'Couve, maçã verde, limão, gengibre e água de coco geladinha.' },
      { id: 'f9', name: 'Chips de Batata Doce Assados', description: 'Porção crocante de chips assados no forno com alecrim e sal rosa.' },
      { id: 'f10', name: 'Pudim de Chia com Leite de Coco', description: 'Sobremesa saudável adoçada com tâmaras e coberta com geleia de manga.' }
    ]
  },
  {
    id: '10',
    name: 'Barbecue & Fumaceira da Paz',
    category: 'Churrasco & Grelhados',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '20-35 min',
    rating: 4.8,
    description: 'Carnes defumadas por horas no pit smoker imaginário com molho barbecue caseiro.',
    menu: [
      { id: 'bbq1', name: 'Costelinha ao Molho Barbecue (Full Rack)', description: 'Costela de porco macia desmanchando do osso banhada em barbecue artesanal.' },
      { id: 'bbq2', name: 'Brisket Defumado (Peito Bovino)', description: 'Fatias suculentas de peito bovino defumado por 12 horas em lenha de macieira.' },
      { id: 'bbq3', name: 'Pulled Pork Sandwich', description: 'Pão brioche recheado com sobrepaleta suína desfiada, barbecue e coleslaw.' },
      { id: 'bbq4', name: 'Linguiça Cuiabana com Queijo Coalho', description: 'Porção de linguiça artesanal recheada com queijo coalho grelhada na brasa.' },
      { id: 'bbq5', name: 'Pão de Alho Recheado com Cupim', description: 'Pão baguete com creme de alho e recheio abundante de cupim defumado.' },
      { id: 'bbq6', name: 'Mac and Cheese Defumado', description: 'Caracolino envolvido em molho cremosíssimo de queijos gratinado com farofa de bacon.' },
      { id: 'bbq7', name: 'Picanha fatiada na chapa (300g)', description: 'Fatias de picanha no ponto correto servidas com farofa crocante e vinagrete.' },
      { id: 'bbq8', name: 'Asinhas de Frango Buffalo Wings', description: 'Asas de frango crocantes empanadas e banhadas em molho picante ou barbecue.' },
      { id: 'bbq9', name: 'Milho Grelhado na Brasa com Manteiga', description: 'Espiga de milho doce grelhada com manteiga de ervas e queijo ralado.' },
      { id: 'bbq10', name: 'Farofa Crocante de Bacon e Alho', description: 'Porção extra daquela farofa bem torradinha para acompanhar tudo.' }
    ]
  },
  {
    id: '11',
    name: 'Padaria Sonho do Amanhecer',
    category: 'Padaria & Cafés',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 4.9,
    description: 'Pães artesanais quentinhos, croissants folhados e cafés especiais fresquinhos.',
    menu: [
      { id: 'pad1', name: 'Pão na Chapa com Requeijão na Entrada', description: 'Pão francês na chapa com aquela crosta douradinha de requeijão tostado.' },
      { id: 'pad2', name: 'Croissant Misto Quente Folhado', description: 'Massa folhada francesa amanteigada com queijo prato e presunto de alta qualidade.' },
      { id: 'pad3', name: 'Cappuccino Cremoso com Canela (300ml)', description: 'Café expresso, leite vaporizado, cacau em pó e generosa pitada de canela.' },
      { id: 'pad4', name: 'Sonho Tradicional de Creme da Vovó', description: 'Massa fofinha frita e polvilhada com açúcar de confeiteiro e bastante creme.' },
      { id: 'pad5', name: 'Bolo de Cenoura com Cobertura Durinha', description: 'Fatia generosa de bolo de cenoura com calda vulcânica de chocolate caseiro.' },
      { id: 'pad6', name: 'Misto Quente no Pão de Batata', description: 'Pão de batata super macio recheado com queijo derretido e presunto.' },
      { id: 'pad7', name: 'MOCACCINO com Nutella nas Bordas', description: 'Expresso, leite e bastante Nutella besuntada nas paredes da xícara.' },
      { id: 'pad8', name: 'Carolina Recheada com Doce de Leite', description: 'Mini bomba de massa choux recheada com doce de leite e cobertura de chocolate.' },
      { id: 'pad9', name: 'Pão de Queijo Mineiro Quentinho (6 un)', description: 'Pãezinhos de queijo escaldados com polvilho doce e queijo canastra.' },
      { id: 'pad10', name: 'Toast de Abacate com Ovo Pochê', description: 'Fatia de pão de fermentação natural tostada com guacamole e ovo por cima.' }
    ]
  },
  {
    id: '12',
    name: 'Lamen & Aconchego Oriental',
    category: 'Asiática & Sopas',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '20-35 min',
    rating: 4.9,
    description: 'Caldos quentes e encorpados que aquecem a alma e tranquilizam o peito.',
    menu: [
      { id: 'lam1', name: 'Shoyu Lamen Tradicional', description: 'Caldo à base de shoyu, macarrão fresco, fatias de chashu (porco), ovo marinado e naruto.' },
      { id: 'lam2', name: 'Miso Lamen Intenso', description: 'Caldo denso temperado com pasta de missô artesanal, milho, manteiga e cebolinha.' },
      { id: 'lam3', name: 'Tonkotsu Lamen Cremoso', description: 'Caldo de ossos suínos cozido por 16 horas, enriquecido com óleo de alho negro.' },
      { id: 'lam4', name: 'Gyoza Suíno Dourado na Chapa (6 un)', description: 'Pastéis orientais recheados com carne suína e nira, crocantes por baixo e macios por cima.' },
      { id: 'lam5', name: 'Bao de Porco Desfiado (2 un)', description: 'Pãozinho chinês cozido no vapor super fofinho recheado com barriga de porco e molho hoisin.' },
      { id: 'lam6', name: 'Karage: Frango Frito Japonês', description: 'Pedacinhos de frango marinados no gengibre e alho, fritos com casquinha crocante.' },
      { id: 'lam7', name: 'Shimeji na Manteiga de Garrafa', description: 'Cogumelos shimeji salteados na chapa com manteiga, shoyu e sake mirin.' },
      { id: 'lam8', name: 'Katsu Curry com Arroz', description: 'Lombo suíno empanado em panko servido com molho curry oriental e arroz japonês.' },
      { id: 'lam9', name: 'Edamame com Sal Marinho', description: 'Vagens de soja cozidas no vapor e salpicadas com flor de sal.' },
      { id: 'lam10', name: 'Chá Verde Matcha Gelado', description: 'Bebida refrescante rica em antioxidantes mentais e calma interior.' }
    ]
  },
  {
    id: '13',
    name: 'Arabian Nights: Esfiha & Paz',
    category: 'Árabe & Esfihas',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14e8?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-25 min',
    rating: 4.8,
    description: 'Esfihas abertas quentinhas, quibes crocantes e pastas tradicionais artesanais.',
    menu: [
      { id: 'ar1', name: 'Esfiha Aberta de Carne Temperada', description: 'Massa fininha e leve com recheio de carne bovina, tomate, cebola e especiarias árabes.' },
      { id: 'ar2', name: 'Esfiha Aberta de Queijo com Basturma', description: 'Queijo derretido com tempero leve e borda douradinha.' },
      { id: 'ar3', name: 'Esfiha Aberta de Zaatar com Azeitona', description: 'Mistura tradicional de ervas árabes com azeite de oliva extra virgem.' },
      { id: 'ar4', name: 'Quibe Frito Recheado com Coalhada', description: 'Trigo para quibe bem temperado com hortelã recheado com coalhada seca cremosa.' },
      { id: 'ar5', name: 'Trio de Pastas (Hommus, Babaganoush e Coalhada)', description: 'Acompanha 2 pães árabes quentinhos para chuchar à vontade.' },
      { id: 'ar6', name: 'Shawarma de Frango com Molho de Alho', description: 'Pão folha recheado com tiras de frango grelhado, batata frita e molho de alho suave.' },
      { id: 'ar7', name: 'Charuto de Folha de Uva (10 un)', description: 'Folhas de uva recheadas com arroz e carne moída temperada com canela e limão.' },
      { id: 'ar8', name: 'Kibe Cru Tradicional com Hortelã', description: 'Carne bovina magra batida com trigo, acompanhado de cebola roxa e pão sírio.' },
      { id: 'ar9', name: 'Baklava de Pistache e Mel', description: 'Folhada doce árabe recheada com pistaches picados e regada com calda de flor de laranjeira.' },
      { id: 'ar10', name: 'Esfiha Doce de Chocolate com Banana', description: 'Massa de esfiha coberta com chocolate ao leite e rodelas de banana.' }
    ]
  },
  {
    id: '14',
    name: 'Mister Coxinha & Salgados',
    category: 'Salgados & Fritos',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 4.9,
    description: 'Coxinhas douradas, bolinhas de queijo e salgadinhos de festa de aniversário.',
    menu: [
      { id: 'sal1', name: 'Cento de Mini Salgados Variados', description: '50 coxinhas, 25 bolinhas de queijo e 25 kibezinhos crocantes por fora e macios por dentro.' },
      { id: 'sal2', name: 'Coxinha Gigante Sem Massa Só Frango', description: 'Uma coxinha de 250g recheada puramente com frango desfiado e catupiry.' },
      { id: 'sal3', name: 'Bolinha de Queijo que Derrete (10 un)', description: 'Massa temperada recheada com mozarela que puxa a cada mordida.' },
      { id: 'sal4', name: 'Empada de Palmito que Desmancha', description: 'Massa podre tradicional amanteigada com recheio cremoso de palmito.' },
      { id: 'sal5', name: 'Enroladinho de Salsicha com Molho', description: 'Clássico das festinhas de infância envolvido em massa fofinha.' },
      { id: 'sal6', name: 'Rissoles de Presunto e Queijo', description: 'Salgado frito empanado em farinha de rosca crocante.' },
      { id: 'sal7', name: 'Kibe com Queijo Coalho', description: 'Massa de kibe bem temperada recheada com um bastão de queijo coalho.' },
      { id: 'sal8', name: 'Croquete de Carne Assada', description: 'Feito com carne de panela desfiada bem condimentada e empanada.' },
      { id: 'sal9', name: 'Churros Mini de Doce de Leite (12 un)', description: 'Mini churros fritos na hora e passados no açúcar e canela.' },
      { id: 'sal10', name: 'Guaraná Antarctica Caçulinha Gelado', description: 'A companhia perfeita para a sua porção de salgados fictícios.' }
    ]
  },
  {
    id: '15',
    name: 'Noodle Bar: Wok & Fire',
    category: 'Chinesa & Wok',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-30 min',
    rating: 4.7,
    description: 'Comida chinesa rápida salteada na frigideira Wok com muito sabor e aroma.',
    menu: [
      { id: 'wok1', name: 'Yakisoba Especial de Carne e Frango', description: 'Macarrão oriental com legumes crocantes, tiras de carne, frango e molho shoyu denso.' },
      { id: 'wok2', name: 'Frango Xadrez com Amendoim', description: 'Cubos de frango salteados com pimentões coloridos, cebola e amendoim torrado.' },
      { id: 'wok3', name: 'Lombo Xadrez Agridoce', description: 'Pedacinhos de lombo empanados envolvidos em molho agridoce com abacaxi.' },
      { id: 'wok4', name: 'Arroz Bifum com Camarão e Legumes', description: 'Macarrão de arroz super leve salteado com camarões e broto de feijão (moyashi).' },
      { id: 'wok5', name: 'Carne com Brócolis ao Molho de Ostra', description: 'Fatias finas de carne bovina macia com brócolis frescos e molho encorpado.' },
      { id: 'wok6', name: 'Arroz Yakimeshi Tradicional', description: 'Arroz frito com ovos, cenoura em cubinhos, presunto e cebolinha fresca.' },
      { id: 'wok7', name: 'Rolinho Primavera de Legumes (2 un)', description: 'Casquinha super crocante recheada com repolho e cenoura fatiados.' },
      { id: 'wok8', name: 'Costelinha Suína Agridoce', description: 'Costelinhas empanadas e fritas envolvidas em molho vermelho agridoce.' },
      { id: 'wok9', name: 'Banana Frita com Chocolate', description: 'Banana empanada frita crocante servida com calda quente de chocolate.' },
      { id: 'wok10', name: 'Biscoito da Sorte com Mensagem do Cleiton', description: 'Abra seu biscoito virtual para ler uma sabedoria sobre o dinheiro guardado.' }
    ]
  },
  {
    id: '16',
    name: 'Gelateria Polar Espiritual',
    category: 'Sorvetes & Gelatos',
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 4.9,
    description: 'Gelatos italianos ultra cremosos servidos em casquinhas artesanais crocantes.',
    menu: [
      { id: 'gel1', name: 'Pint de Gelato de Pistache Puro (500ml)', description: 'Feito com pasta 100% pura de pistaches sicilianos sem corantes.' },
      { id: 'gel2', name: 'Gelato de Chocolate Belga 70%', description: 'Sabor intenso e aveludado para os verdadeiros amantes de chocolate denso.' },
      { id: 'gel3', name: 'Sorbet de Morango com Basílico (Zero Leite)', description: 'Refrescante sorvete à base de água com morangos frescos e manjericão.' },
      { id: 'gel4', name: 'Gelato de Dulce de Leche com Biscoito', description: 'Doce de leite argentino mesclado com pedaços de biscoito crocante.' },
      { id: 'gel5', name: 'Milkshake de Ovaltine Crocante (500ml)', description: 'Gelato de baunilha batido com bastante calda de chocolate e Ovaltine.' },
      { id: 'gel6', name: 'Milkshake de Fandango Doce de Leite', description: 'Combinação inusitada e extremamente cremosa que acalma qualquer mente.' },
      { id: 'gel7', name: 'Casquinha Biscoito Artesanal com Nutella', description: 'Casquinha assada na hora com recheio interno de Nutella pura.' },
      { id: 'gel8', name: 'Sundae da Felicidade Imediata', description: '3 bolas de gelato, chantilly caseiro, calda quente e cereja no topo.' },
      { id: 'gel9', name: 'Picolé Gourmet de Ninho com Trufa', description: 'Picolé cremoso de leite Ninho coberto com casquinha crocante de chocolate.' },
      { id: 'gel10', name: 'Banana Split Abstrata', description: 'Banana cortada ao meio com sorvetes de chocolate, creme e morango.' }
    ]
  },
  {
    id: '17',
    name: 'Creperia Paris na Mente',
    category: 'Crêpes & Salgados',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-25 min',
    rating: 4.8,
    description: 'Crêpes franceses bem fininhos e recheados até a borda com ingredientes nobres.',
    menu: [
      { id: 'cr1', name: 'Crêpe Francês de Mignon com Gorgonzola', description: 'Massa leve e dourada recheada com tiras de filé mignon e queijo gorgonzola cremoso.' },
      { id: 'cr2', name: 'Crêpe de Quatro Queijos com Alho Poró', description: 'Combinação perfeita de mozarela, provolone, queijo prato e catupiry salteado.' },
      { id: 'cr3', name: 'Crêpe de Peito de Peru com Brie e Geleia', description: 'Sabor agridoce sofisticado com queijo brie derretido e geleia de pimenta.' },
      { id: 'cr4', name: 'Crêpe Doce de Nutella com Morango e Banana', description: 'O queridinho de Paris: generosa camada de Nutella com frutas fatiadas.' },
      { id: 'cr5', name: 'Crêpe Suzette com Calda de Laranja', description: 'Sobremesa clássica francesa flambada em calda de laranja e açúcar.' },
      { id: 'cr6', name: 'Crêpe de Frango com Requeijão e Milho', description: 'Recheio cremoso tradicional brasileiro envolvido na leveza da massa francesa.' },
      { id: 'cr7', name: 'Crêpe Vegetariano de Cogumelos e Espinafre', description: 'Cogumelos frescos salteados no azeite com folhas de espinafre macias.' },
      { id: 'cr8', name: 'Crêpe Doce de Doce de Leite com Nozes', description: 'Doce de leite cremoso salpicado com nozes crocantes picadinhas.' },
      { id: 'cr9', name: 'Galette de Trigo Sarraceno com Ovo e Presunto', description: 'Massa escura tradicional da Bretanha com ovo de gema mole no centro.' },
      { id: 'cr10', name: 'Crêpe Doce de Maçã Caramelizada com Canela', description: 'Fatias de maçã cozidas no caramelo quente polvilhadas com canela.' }
    ]
  },
  {
    id: '18',
    name: 'Boteco do Cleiton: Porções',
    category: 'Porções & Boteco',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-30 min',
    rating: 4.9,
    description: 'Petiscos de estufa de boteco, mandioca frita crocante e calabresa acebolada.',
    menu: [
      { id: 'bot1', name: 'Porção de Batata Frita Suprema com Bacon e Cheddar', description: '500g de batata frita bem crocante coberta com muito cheddar e bacon em cubos.' },
      { id: 'bot2', name: 'Calabresa Acebolada na Cachaça', description: 'Linguiça calabresa fatiada salteada com cebolas roxas e finalizada na frigideira.' },
      { id: 'bot3', name: 'Mandioca Frita Crocante por Fora e Macia por Dentro', description: 'Bastões de mandioca cozidos e fritos servidos com manteiga de garrafa.' },
      { id: 'bot4', name: 'Iscas de Peixe Empanadas com Molho Tártaro', description: 'Tiras de filé de peixe branco empanadas na farinha panko bem crocantes.' },
      { id: 'bot5', name: 'Provolone à Milanesa em Cubos', description: 'Cubinhos de queijo provolone empanados e fritos para chuchar no molho.' },
      { id: 'bot6', name: 'Frango a Passarinho com Bastante Alho Frito', description: 'Pedaços crocantes de frango frito cobertos por uma chuva de alho dourado.' },
      { id: 'bot7', name: 'Torresmo de Rolo Pururucado', description: 'Torresmo Crocante assado e pururucado que faz barulho a cada mordida.' },
      { id: 'bot8', name: 'Dadinhos de Tapioca com Geleia de Pimenta (12 un)', description: 'Cubes de tapioca com queijo coalho fritos servidos com geleia agridoce.' },
      { id: 'bot9', name: 'Bolinho de Bacalhau do Boteco (8 un)', description: 'Bolinhos tradicionais bem recheados com bacalhau e batata.' },
      { id: 'bot10', name: 'Polenta Frita Polvilhada com Parmesão', description: 'Bastões de polenta frita douradinha cobertos com queijo ralado fino.' }
    ]
  },
  {
    id: '19',
    name: 'Hot Dog Pressão & Carga',
    category: 'Cachorro-Quente',
    image: 'https://images.unsplash.com/photo-1627037558426-c2d07beda3af?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '10-20 min',
    rating: 4.8,
    description: 'Cachorro-quente prensado no estilo paulistano com purê de batata de verdade.',
    menu: [
      { id: 'dog1', name: 'Hot Dog Prensado Duplo com Purê', description: 'Pão macio, 2 salsichas, molho especial, bastante purê de batata, milho, ervilha e batata palha.' },
      { id: 'dog2', name: 'Dog Bacon e Cheddar Vulcão', description: 'Pão, salsicha grelhada, creme de cheddar cremoso, bacon crispy e molho barbecue.' },
      { id: 'dog3', name: 'Dog Frango Desfiado com Catupiry', description: 'Salsicha acompanhada de generosa porção de frango temperado e catupiry gratinado.' },
      { id: 'dog4', name: 'Hot Dog Mexicano Chilli Picante', description: 'Salsicha coberta com carne moída apimentada, doritos moído e queijo cheddar.' },
      { id: 'dog5', name: 'Dog Vegetariano de Salsicha de Soya', description: 'Pão macio, salsicha vegetal, purê artesanal, vinagrete e batata palha crocante.' },
      { id: 'dog6', name: 'Dog Especial Quatro Queijos', description: 'Salsicha coberta com molho cremoso de mozarela, provolone, queijo prato e parmesão.' },
      { id: 'dog7', name: 'Dog Simples da Infância', description: 'Pão, salsicha ao molho de tomate caseiro, maionese e batata palha.' },
      { id: 'dog8', name: 'Dog Calabresa Acebolada Prensado', description: 'Fatias de calabresa no lugar da salsicha com vinagrete e purê de batata.' },
      { id: 'dog9', name: 'Porção Extra de Purê de Batata Cremoso', description: 'Aquele potinho adicional do purê mais lisinho da cidade.' },
      { id: 'dog10', name: 'Combo Dogão + Batata Frita + Refrigerante 350ml', description: 'O combo clássico para matar a fome da noite.' }
    ]
  },
  {
    id: '20',
    name: 'Poke Hawaii: Frescor & Paz',
    category: 'Hawaiiano & Bowls',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
    deliveryTime: '15-25 min',
    rating: 4.9,
    description: 'Bowls havaianos coloridos, frescos e repletos de sabor e leveza.',
    menu: [
      { id: 'pok1', name: 'Poke Tradicional de Salmão e Manga', description: 'Arroz japonês, salmão fresco em cubos, manga doce, pepino, kani e molho tarê.' },
      { id: 'pok2', name: 'Poke Atum Spicy com Cream Cheese', description: 'Atum fresco com pimenta sriracha, cream cheese, cebolinha, gergelim e nori.' },
      { id: 'pok3', name: 'Poke Camarão Crocante no Panko', description: 'Camarões empanados no panko, abacate, edamame, cenoura ralada e molho ponzu.' },
      { id: 'pok4', name: 'Poke Vegan Tofu Marinado', description: 'Tofu grelhado em cubos, abacate, tomate cereja, repolho roxo, milho e castanhas.' },
      { id: 'pok5', name: 'Poke Mix de Salmão e Atum', description: 'O melhor dos dois mundos: cubos de salmão e atum com alho poró crocante.' },
      { id: 'pok6', name: 'Monte seu Poke Abstrato (Até 8 ingredientes)', description: 'Escolha sua base, proteínas, acompanhamentos e molho preferidos.' },
      { id: 'pok7', name: 'Chips de Nori Crocante Temperado', description: 'Folhas de alga marinada crocantes com gergelim para acompanhar seu bowl.' },
      { id: 'pok8', name: 'Poke Doce de Morango com Leite Condensado', description: 'Base de sorvete de baunilha, morangos, farofa de biscoito e calda doce.' },
      { id: 'pok9', name: 'Kombucha de Frutas Vermelhas (350ml)', description: 'Bebida fermentada naturalmente frisante e benéfica para a microbiota mental.' },
      { id: 'pok10', name: 'Poke de Ceviche de Peixe Branco', description: 'Peixe branco marinado no limão com cebola roxa, milho e pimenta dedo-de-moça.' }
    ]
  }
];
