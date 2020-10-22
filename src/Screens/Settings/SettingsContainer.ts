import { connect } from "react-redux";
import { TDispatchProps, TStateProps } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { Settings, ISettingsProps } from "./Settings";
import { logout } from "../Auth/actions";
import { clearCacheStart } from "../DocViewSearch/actions";


type StateProps = TStateProps<ISettingsProps>;
type DispatchProps = TDispatchProps<ISettingsProps>;

const mapStateToProps = (state: State): StateProps => ({
  name: state?.auth?.data?.name,
  totalCacheSize: state.docView.totalCacheSize
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    logout: () => {
        return dispatch(logout());
    },
    clearCache: () => {
      return dispatch(clearCacheStart());
    }
  };
};

export const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);
