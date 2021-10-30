import React, {useState} from 'react';
import { StyleSheet, Text, View, Component, Dimensions, Image, TextInput, FlatList, Button ,ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

const CalendarWrapper = (props) => {
    var current = props.current
    console.log("CALENDAR WRAPPER")
    console.log(current)
    return (
        <Calendar current={current}
        monthFormat={'MMMM, YYYY'}
        
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        
        ></Calendar>
    )
}
export default CalendarWrapper