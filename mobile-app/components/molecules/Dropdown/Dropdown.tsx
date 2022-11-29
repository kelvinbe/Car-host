import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { Divider, Icon } from '@rneui/base';
import ChevronDown from "../../../assets/icons/chevron-down.svg"

interface IProps {
    onChange?: (value: string) => void,
    items?: {
        label: string,
        value: string
    }[],
    placeholder?: string,
    additionlText?: string,
    dropdownOpen?: (v: boolean) => void,
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props) =>{
    return ({  
        container: {
            width: "100%",
            backgroundColor: "transparent"
        },
        dropdownInputContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.white,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: theme.colors.stroke,
            overflow: "hidden"
        },
        selectedContainer: {
            width: props?.additionlText ? "60%" : "80%",
            height: "100%",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        selectedText: {
            fontWeight: "600",
            fontSize: 16,
            textAlign: "left",
            width: "100%"
        },
        iconStyle: {
            width: 12,
            height: 10
        },
        divider: {
            backgroundColor: theme.colors.stroke
        },
        additionalText: {
            fontWeight: "600",
            fontSize: 12,
            paddingHorizontal: 10
        },
        dropdownValuesContainer: {
            width: "100%",
            backgroundColor: "white",
            elevation: 4,
            borderRadius: 4,
            marginTop: 10
        },
        dropdownValue: {
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 15,
        },
        dropdownValueText: {
            fontWeight: "600",
            fontSize: 16,
            textAlign: "left"
        }
    })
})

const Dropdown = (props: Props) => {
    const {items, onChange, placeholder, additionlText, dropdownOpen} = props
    const [open, setOpen] = useState<boolean>(false)
    const [currentValue, setCurrentValue] = useState<string>( placeholder || "Select " )
    const styles = useStyles(props)

    const toggleDropdown = () => {
        setOpen(!open)
        dropdownOpen && dropdownOpen(!open)
    }

    const handleSelect = (index: number) =>{
        toggleDropdown()
        setCurrentValue(items?.find((_, i)=> i== index)?.label || "")
        onChange && onChange(items?.find((_, i)=>i === index)?.value || "")
    }
  return (
    <ThemeConsumer>
        {({theme})=>(
            <View style={styles.container} >
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownInputContainer} >
                    <View style={styles.selectedContainer} >
                        <Text style={styles.selectedText} >{currentValue}</Text>
                    </View>
                    <Divider style={styles.divider} orientation='vertical' />
                    { additionlText && <Text style={styles.additionalText} >
                        {
                            additionlText
                        }
                    </Text>}
                    <ChevronDown  style={styles.iconStyle} stroke={theme.colors.black} />
                </TouchableOpacity>
                { open && <View style={styles.dropdownValuesContainer} >
                    {
                        items?.map((item, i)=>(
                            <TouchableOpacity key={i} onPress={()=>{
                                handleSelect(i)
                                }}  style={styles.dropdownValue} >
                                <Text style={styles.dropdownValueText} >
                                    {
                                        item.label
                                    }
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                    
                </View>}
            </View>
        )}
    </ThemeConsumer>
    
  )
}

export default Dropdown

const styles = StyleSheet.create({})