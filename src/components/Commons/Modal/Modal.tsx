import style from "./Modal.module.scss";

export function Modal(props: ModalProps) {
    return (
        <>
            {" "}
            <div className={style.darkBg} />
            <div className={style.modal}>
                <button className={style.closeBtn} onClick={props.onClick}>
                    X
                </button>
                <p>{props.message}</p>
            </div>
        </>
    );
}
export interface ModalProps {
    onClick: () => void;
    message: string;
}
