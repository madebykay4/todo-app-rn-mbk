import {View, Text, Switch} from 'react-native'
import React, {useState} from 'react'
import {LinearGradient} from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";
import {createSettingsStyles} from "@/assets/styles/settings.styles";
import {Ionicons} from "@expo/vector-icons";

const Preferences = () => {
    const {colors, toggleDarkMode, isDarkMode} = useTheme();
    const settingsStyles = createSettingsStyles(colors);

    const [isAutoSync,setIsAutoSync] = useState(true);
    const [isNotifcationsEnabled, setIsNotifcationsEnabled] = useState(true);

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Preferences</Text>


            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary}
                        style={settingsStyles.settingIcon}>
                        <Ionicons name={"moon"} size={20} color={"white"}/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Dark Mode</Text>
                </View>
                <Switch value={isDarkMode} onValueChange={toggleDarkMode} thumbColor={"white"} trackColor={{ false: colors.border, true: colors.primary}} ios_backgroundColor={"colors.border"} />
            </View>


            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning}
                                    style={settingsStyles.settingIcon}>
                        <Ionicons name={"notifications"} size={20} color={"white"}/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Notifications</Text>
                </View>
                <Switch value={isNotifcationsEnabled} onValueChange={() => setIsNotifcationsEnabled(!isNotifcationsEnabled)} thumbColor={"white"} trackColor={{ false: colors.border, true: colors.warning}} ios_backgroundColor={"colors.border"} />
            </View>

            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.success}
                                    style={settingsStyles.settingIcon}>
                        <Ionicons name={"sync"} size={20} color={"white"}/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Auto Sync</Text>
                </View>
                <Switch value={isNotifcationsEnabled} onValueChange={() => setIsAutoSync(!isAutoSync)} thumbColor={"white"} trackColor={{ false: colors.border, true: colors.success}} ios_backgroundColor={"colors.border"} />
            </View>
        </LinearGradient>
    )
}
export default Preferences
