import React, {Component} from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';

import moment from 'moment';

const {width, height} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View
          style={{
            ...styles.container,
            padding: 20,
          }}>
          <Text style={styles.heading}>About this App</Text>
          <Text style={styles.text}>
            Ciao, io sono Antonello e con alcuni amici ho inventato Ora Romana.
          </Text>
          <Text style={styles.subHeading}>Panoramica</Text>
          <Text style={styles.text}>
            Ora Romana è un orologio italico a 6 ore, in uso nella città Roma,
            nel Lazio e nell’Italia meridionale per regolare il lavoro nei campi
            fino all’arrivo di Napoleone.
            {`\n\n`}
            La sua caratteristica è che è un orologio senza stress, in cui non è
            necessario spaccare esattamente il minuto, come siamo abituati oggi.
            {`\n\n`}
            Un`ora romana infatti non dura 60 minuti. L’ora romana è fluida, ha
            una durata variabile: può durare di più (fino a 75 minuti) o di meno
            (fino a 45), secondo la stagione e la fascia oraria della giornata.
            Ad esempio in estate le ore di luce sono molto lunghe e quelle di
            buio molto brevi. In inverno succede il contrario. Agli equinozi la
            durata è più o meno bilanciata.
            {`\n\n`}E ora un po’ di storia. Il primo prototipo meccanico di Ora
            Romana, con tecnologia Arduino, è stato realizzato dal mio amico
            Matteo. L’App che stai utilizzando, invece, è stata realizzata dal
            mio amico Hamza. Sia il prototipo che l’App si basano su rigorose
            tabelle astronomiche, verificate dal mio amico Paolo:
          </Text>
          <Text style={styles.subHeading}>
            Alba, mezzogiorno, tramonto, mezzanotte e momenti speciali
          </Text>
          <Text style={styles.text}>
            Per ogni giorno dell’anno, alla latitudine di Roma, una base-dati
            estrae quattro momenti speciali: l’alba, il mezzogiorno, il tramonto
            e la mezzanotte.
            {`\n\n`}
            In ognuno di questi momenti speciali l’unica lancetta dell’orologio
            (non esiste la lancetta dei minuti!) si trova allineata sul numero
            VI e inizia il suo giro di quadrante, che dura 6 ore:
            {`\n\n`}- Il primo giro parte all’alba e finisce a mezzogiorno (la
            mattina);{`\n`}- il secondo va da mezzogiorno al tramonto (la
            controra, cioè il pomeriggio);{`\n`}- il terzo giro (la sera) dura
            fino alla mezzanotte;{`\n`}- il quarto e ultimo giro (la notte)
            termina all’alba.
            {`\n\n`}
            Il totale delle ore della giornata, insomma, è sempre di 24 ore: è
            la loro velocità (diurna o notturna) che cambia.
            {`\n\n`}
            L’orologio individua inoltre due momenti speciali della giornata: la
            mezza (la pausa-pranzo di mezz’ora tra mattina e controra) e i
            vespri (la pausa di mezz’ora per le preghiere dopo il tramonto).
            Alla mezza e ai vespri non è lecito chiederti di lavorare! Dopo i
            vespri, inoltre, si chiudono le chiese e si aprono le osterie!
          </Text>
          <Text style={styles.subHeading}>Ritrova il tuo tempo!</Text>
          <Text style={styles.text}>
            Usare l’ora romana cambierà il tuo modo di pensare il tempo e le tue
            attività quotidiane: le ore di luce (mattina e controra) sono quelle
            più indicate per il lavoro; mentre le ore di buio sono per lo svago
            e il riposo. Dare un`occhiata alla tua app Ora Romana ti sarà utile
            per capire se stai gestendo bene il tuo tempo: potrai capire ad
            esempio se lavori troppo, se dormi troppo poco, o se trascuri lo
            svago.
            {`\n\n`}
            Lasciati guidare dai ritmi rilassati della tradizione di Roma!
            Ritrova il tuo tempo!
          </Text>
          <Text style={styles.subHeading}>Contatti</Text>
          <Text style={styles.text}>
            Per ogni domanda contattami all’indirizzo info@anappo.it.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

HomeScreen.defaultProps = {};
HomeScreen.navigationOptions = {
  title: '',
  headerStyle: {
    height: 0,
  },
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    // height: height,
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007acc',
  },

  heading: {
    fontFamily: 'Trajan-Bold',
    fontSize: 30,

    // top: 50,
    // position: 'absolute',
    color: '#fff',
  },
  text: {
    // fontFamily: 'Trajan',

    // fontWeight: 'bold',
    // bottom: 100,
    // position: 'absolute',
    textAlign: 'justify',
    color: '#fff',
    padding: 10,
  },
  subHeading: {
    // fontFamily: 'Trajan',
    fontSize: 16,
    // lineHeight:25,
    // fontWeight: 'bold',
    // bottom: 100,
    // position: 'absolute',

    textAlign: 'left',
    color: '#fff',
    padding: 10,
  },
});

export default HomeScreen;
