module.exports = {
    name: 'MannyCard',
    publisher: 'Sample',
    cards: [{
        type: 'MannyCardCard',
        source: './src/cards/MannyCardCard',
        title: 'MannyCard Card',
        displayCardType: 'MannyCard Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a', 'button']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};