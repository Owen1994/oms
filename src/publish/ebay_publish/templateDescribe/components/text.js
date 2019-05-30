


import React from 'react'

const style = {
    txt: {
        marginTop: '15px',
    },
}

class Text extends React.PureComponent {

    render() {
        return (
            <div style={style.txt}>
                <p>This is the text direct described the product of the listing.</p>
                <br />
                <p>For example:</p>
                <br />
                <p>Features:</p>
                <p>100 % Brand new and high quality!</p>
                <p>This elegant waterproof storage bag is designed for keeping and storing your underwears, cosmetic, etc.</p>
                <p>Fashionable design and large capacity.</p>
                <p>Make your items clean.</p>
                <p>Big space, classify to storage your underwears, baby products, and small personal stuffs.</p>
                <p>Easy to carry, ideal for travel.</p>
                <p>Specifications:</p>
                <p>Color: Pink, Blue, Watermelon Red, Wine Red</p>
                <p>Material: Water - resistant Nylon</p>
                <p>Size: approx. 24cm x 17cm x 7cm</p>
                <br />
                <p>Package includes:</p>
                <p>1 x Storage Bag</p>
            </div>
        )
    }
}

export default Text

