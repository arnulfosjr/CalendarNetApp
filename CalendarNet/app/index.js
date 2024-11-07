import { Link } from 'expo-router';
import { Text } from 'react-native';

export default function Index() {
    return(
        <Link href="/screens/UserAccess">
            <Text>Go to UserAccess</Text>
        </Link>
    );
 
};