import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button, ScrollView, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {CreditCardInput, LiteCreditCardInput} from "react-native-vertical-credit-card-input"
import axios from 'axios';
import stripe from '@stripe/stripe-react-native'

const 