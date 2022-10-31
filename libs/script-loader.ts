import { SQUAD_PAYMENT_MODAL_SCRIPT_LINK } from "./util";

const useISLoader = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = SQUAD_PAYMENT_MODAL_SCRIPT_LINK;
        script.async = true;
        document.body.appendChild(script);
        const onLoad = () => {
            resolve(true)
            script.removeEventListener('error', onError);
            script.removeEventListener('load', onLoad);
        }
        const onError = (err?: unknown) => {
            reject(err)
            script.removeEventListener('error', onError);
            script.removeEventListener('load', onLoad);
        }
        script.addEventListener('load',  onLoad);
        script.addEventListener('error', onError)
    });
}

export default useISLoader;