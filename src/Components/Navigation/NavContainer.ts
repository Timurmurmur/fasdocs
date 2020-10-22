import { connect } from "react-redux";
import { Navigation, INavigationProps } from "./Navigation";
import { TDispatchProps, TStateProps } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { setIsFirstOpen } from "../../Screens/Auth/actions";

interface OwnProps {
}

type StateProps = TStateProps<INavigationProps, OwnProps>;
type DispatchProps = TDispatchProps<INavigationProps, OwnProps>;

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  data: state.auth.data,  
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    setIsFirstOpen: (data: boolean) => {
      return dispatch(setIsFirstOpen(data));
    }
  };
};

export const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation);
