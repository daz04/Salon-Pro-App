<View style={styles.body}>
<View>
    <Text style={{ color: '#1A2232',
fontWeight: '500', fontSize:18, paddingBottom:'5%'}}>Personal Information</Text>
<View style={styles.col}>
    <Text style={styles.text}>First Name</Text>
    <Text style={styles.name}>{firstName}</Text>
    
</View>
<View style={styles.col}>
    <Text style={styles.text}>Last Name</Text>
    <Text style={styles.name}>{lastName}</Text>
   
</View>

<View style={styles.col}>
<Text style={styles.text}>Birthday</Text>
<Text style={styles.name}>{birthday}</Text>


</View>

</View>
<View>
<Text style={{color: '#1A2232',
fontWeight: '500', fontSize:18, paddingBottom:'5%', paddingTop:'5%'}}>Contact Information</Text>
<View style={styles.col}>
    <Text style={styles.text}>Email</Text>
    {/* <Text style={styles.name}>{email}</Text> */}
    <TextInput style={styles.numberInput}
    value={email}
    onChangeText={setEmail}
  ></TextInput>
   


    
   

</View>

<View style={styles.col}>
<Text style={styles.text}>Phone</Text>
<View style={styles.phone}>
{/* <View>
        <Text style={styles.extText}>+1</Text>
    </View>
<Text style={styles.name}>{number}</Text> */}

<TextInput style={styles.numberInput}
value={number}
    keyboardType='numeric'
    value={number}
    onChangeText={_handleNumberChange}
    maxLength={12}></TextInput>
    

</View>

</View>
</View>

<View style={styles.radiusBox}>
<Text style={styles.text}>Specify Working Radius</Text>

<View style={styles.qtySelect}>
    <TouchableOpacity style={styles.buttons} onPress={()=> {if (radius>1){setRadius(radius=> radius-1)}}}>
        <Text style={styles.btnText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.qtyText}>{radius}</Text>
    <TouchableOpacity style={styles.buttons} onPress={()=>{if (radius<10) {setRadius(radius=> radius+1)}}}>
        <Text style={styles.btnText}>+</Text>
    </TouchableOpacity>


</View>


</View>





</View>