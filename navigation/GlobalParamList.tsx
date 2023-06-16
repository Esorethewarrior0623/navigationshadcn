import { StackNavigationProp } from "@react-navigation/stack";



export type GlobalParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Settings: undefined;
  BusinessDetails: {account_id :string};
  //add more screenshere I think
};

export type ScreenNavigationProp = StackNavigationProp<GlobalParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GlobalParamList {}
  }
}
