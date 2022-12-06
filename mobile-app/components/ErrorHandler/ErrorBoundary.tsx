import { ThemeConsumer } from '@rneui/themed';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ThemeConsumer>
        {({theme})=>(
          <View style={styles.container}>
            <Text style={{
              color: theme.colors.error,
              fontSize: 18,
              fontWeight: 'bold'

            }} >
              {
                this.state.error?.message
              }
            </Text>
          </View>
        )}
      </ThemeConsumer>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
})

