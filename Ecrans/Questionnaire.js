import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WavyBackground from "react-native-wavy-background";


export default function Questionnaire() {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

    return (
        <View
        style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <WavyBackground
              height={300}
              width={1100}
              amplitude={25}
              frequency={1}
              offset={150}
              color="#1F618D"
              bottom
            />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    containerHeadline: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20
    }
});