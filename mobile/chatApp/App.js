import React from 'react';
import {
   SafeAreaView,
   View,
   Text,
   TextInput,
   YellowBox,
   TouchableOpacity
} from 'react-native';
import io from 'socket.io-client';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         text: '',
         chatMessages: []
      }
   }

   componentDidMount() {
      this.socket = io("http://localhost:3000");
      // listener to messages
      this.socket.on('chat message', msg => {
         this.setState({
            chatMessages: [...this.state.chatMessages, msg]
         })
      })
   }

   onChangeText = (text) => {
      this.setState({ text })
   }

   handleSubmit = () => {
      this.socket.emit('chat message', this.state.text);
      this.setState({ text: '' })
   }

   render() {
      YellowBox.ignoreWarnings([
         'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
      ])
      return (
         <SafeAreaView style={{ flex: 1, paddingBottom: 10 }}>
            <View style={{ flex: 1, backgroundColor: '#ecf0f1', paddingVertical: 30, paddingHorizontal: 5 }}>
               {
                  this.state.chatMessages.map((message, index) => (
                     <View key={index} style={{alignItems: 'flex-start', marginBottom: 5}}>
                        <View style={{
                           backgroundColor: '#3498db',
                           paddingVertical: 15,
                           paddingHorizontal: 20,
                           borderTopLeftRadius: 0,
                           borderTopRightRadius: 20,
                           borderBottomLeftRadius: 20,
                           borderBottomRightRadius: 20,
                        }}>
                           <Text style={{color: 'white'}}>{message}</Text>
                        </View>

                     </View>

                  ))
               }
            </View>

            <View style={{ 
               paddingVertical: 20, 
               backgroundColor: 'white', 
               paddingHorizontal: 15,
               borderTopWidth: 1,
               borderTopColor: '#bdc3c7'
            }}>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1, paddingRight: 15 }}>
                     <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.text}
                        placeholder="Message.."
                        autoCorrect={false}
                        onSubmitEditing={() => {
                           this.handleSubmit()
                        }}
                     />
                  </View>
                  <TouchableOpacity>
                     <View style={{
                        backgroundColor: '#3498db',
                        width: 70,
                        height: 50,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                     }}>
                        <Text style={{ color: 'white' }}>Send</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         </SafeAreaView>
      )
   }
}

export default App