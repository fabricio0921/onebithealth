import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard,
    FlatList

} from "react-native";

import ResultImc from "../ResultImc";
import styles from "./style";




export default function Form() {
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("preencha o peso e a altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])


    function verificatioImc() {
        if (imc == null) {
            Vibration.vibrate()
            setErrorMessage('Campo obrigatório')

        }

    }


    function imcCalculator() {
        let heightFormart = height.replace(",", ".")
        let totalImc = ((weight / (heightFormart * heightFormart)).toFixed(2))
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }])
        setImc(totalImc)
    }

    function validationImc() {
        console.log(imcList)
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        } else {
            verificatioImc()
            setImc(null)
            setTextButton('Calcular')
            setMessageImc('preencha Peso e Altura')
        }



    }

    return (

        <View style={styles.formContext}>
            {imc == null ?
                <Pressable style={styles.form} onPress={Keyboard.dismiss}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.75"
                        keyboardType="numeric"
                    />
                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={setWeight}
                        value={weight}
                        placeholder="Ex. 72.236"
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>

                    </TouchableOpacity>


                </Pressable>
                :
                <View style={styles.exhibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                    <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>

                    </TouchableOpacity>

                </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.TextResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>


                    )
                }}
                keyExtractor={(item) => { item.id }}
            />



        </View>
    )
}