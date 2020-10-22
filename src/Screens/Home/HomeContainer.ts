import { connect } from "react-redux";
import { TDispatchProps, TStateProps } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { Home, IHomeProps } from "./Home";
import { getAllDocuments } from "./actions";
import { setIsFirstOpen } from "../Auth/actions";


type StateProps = TStateProps<IHomeProps>;
type DispatchProps = TDispatchProps<IHomeProps>;

const mapStateToProps = (state: State): StateProps => ({
    pageStatus: state.home.pageStatus,
    documents: state.home.documents,
    error: state.home.error,
    isFirstOpen: state.auth.isFirstOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    getAllDocuments: () => {
      return dispatch(getAllDocuments());
    },
    setIsFirstOpen: (data: boolean) => {
        return dispatch(setIsFirstOpen(data));
    }
  };
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
