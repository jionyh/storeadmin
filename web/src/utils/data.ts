export const CategoryData = [
    {
        name: 'peixes',
        sub: [
            {value: 1, name: 'Salmão'},
            {value: 2, name: 'Camarão'},
            {value: 3, name: 'Lagosta'},
            {value: 4, name: 'Lula' }
        ]
    },
    {
        name: 'legumes',
        sub: [
            {value: 1, name: 'Pepino'},
            {value: 2, name: 'Cenoura'},
            {value: 3, name: 'Alface'},
            {value: 4, name: 'Tomate' }
        ]
    }
]

export const Compras = {
        day: '13/05',
        data:[
            {
                cat: 'peixes',
                products: [
                    {name: 'Salmão', value: 20.99},
                    {name: 'Camarão', value: 14.80},
                    {name: 'Salmão', value: 20.99},
                    {name: 'Camarão', value: 14.80}
                ]
            },
            {
                cat: 'verduras',
                products: [
                    {name: 'Alface', value: 2.99},
                    {name: 'Cenoura', value: 1.80}
                ]
            },
            {
                cat: 'Prod. Limpeza',
                products: [
                    {name: 'Desinfetante', value: 1.99},
                    {name: 'Alcool', value: 4.80}
                ]
            },
            {
                cat: 'Prod. Limpeza',
                products: [
                    {name: 'Desinfetante', value: 1.99},
                    {name: 'Alcool', value: 4.80}
                ]
            },
            {
                cat: 'Prod. Limpeza',
                products: [
                    {name: 'Desinfetante', value: 1.99},
                    {name: 'Alcool', value: 4.80}
                ]
            }
        ]
    }

export const Vendas = {
    day: '14/05',
    total: 109+30+60+49,
    data:[
        {name: 'cartao', value: '109,00'},
        {name: 'dinheiro', value: '30,00'},
        {name: 'delivery', value: '60,00'},
        {name: 'outros', value: '49,00'}
    ]}