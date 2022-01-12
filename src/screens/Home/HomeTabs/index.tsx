import React, { useContext } from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Typography } from '../../../components/shared/Typography';
import { ThemeContext } from '../../../contexts/Theme/theme';
import ActivityTab from '../../../components/Home/ActivityTab';
import AssetsTab from '../../../components/Home/AssetsTab';
import styles from './styles';

const renderScene = SceneMap({
  Assets: AssetsTab,
  Activity: ActivityTab,
});

const TabsHeader = props => {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  return (
    <TabBar
      indicatorStyle={{ backgroundColor: colors.primary100 }}
      style={[
        styles.tabsHeaderContainer,
        {
          backgroundColor: colors.white,
        },
      ]}
      renderTabBarItem={tabProps => (
        <TouchableOpacity
          key={tabProps.key}
          activeOpacity={0.9}
          onPress={tabProps.onPress}
          style={styles.tabHeaderItem}>
          <Typography
            type="smallTitleR"
            style={{
              color:
                props.navigationState.routes[props.navigationState.index]
                  .key === tabProps.key
                  ? colors.primary100
                  : colors.primary40,
            }}>
            {tabProps.route.title}
          </Typography>
        </TouchableOpacity>
      )}
      {...props}
    />
  );
};

const HomeTabs: React.FC = () => {
  const layout = useWindowDimensions();
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [homeTabRoutes] = React.useState([
    { key: 'Assets', title: 'Assets' },
    { key: 'Activity', title: 'Activity' },
  ]);

  return (
    <TabView
      navigationState={{ index: currentTabIndex, routes: homeTabRoutes }}
      renderScene={renderScene}
      onIndexChange={setCurrentTabIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={TabsHeader}
    />
  );
};

export default HomeTabs;
