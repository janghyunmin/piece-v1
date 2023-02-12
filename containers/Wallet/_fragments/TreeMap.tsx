import React, { useState, useEffect } from 'react';
import { Button, View, Input, Pressable, Image, Flex, Text } from 'native-base';
import { Platform, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import EditCloseIcon from 'components/Icons/EditCloseIcon';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";



{/* 내지갑 트리맵 테스트 진행중 0621 */ }
const TreeMap = ({ navigation }: any) => {

    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const navbarHeight = screenHeight - windowHeight + getStatusBarHeight();

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
        },

    };
    const series = [
        {
            name: "All Tasks",
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: "My Tasks",
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ];


    {/* Shadow & Style CSS start  */ }
    const styles = StyleSheet.create({
        container: {
            ...Platform.select({
                ios: {
                    height: screenHeight,
                    backgroundColor: '#ffffff'
                },
                android: {
                    height: screenHeight,
                    backgroundColor: '#ffffff'
                },
            })
        },
        // Top layout CSS
        top_layout: {
            ...Platform.select({
                ios: {
                    marginTop: 33,
                    zIndex: 998,
                },
                android: {
                    marginTop: 33,
                    zIndex: 998
                },
            }),
        },

        // Bottom layout CSS
        bottom_layout: {
            ...Platform.select({
                ios: {
                    flex: 1,
                    marginTop: 20,
                },
                android: {
                    flex: 1,
                    marginTop: 20,
                },
            }),
        },
    });
    {/* Shadow & Style CSS end  */ }
    return (
        // 부모 layout start
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={350}
        />
        // <View style={styles.container}>
        //     <View style={[styles.top_layout]}>
        //         <View style={[styles.bottom_layout]}>

        //         </View>
        //     </View>
        // </View>
    );
};

export default TreeMap;
