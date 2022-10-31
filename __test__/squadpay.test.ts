import {describe, it, afterEach,  expect, test} from 'vitest';
import { mount } from "@vue/test-utils"
import SquadPay from "../libs"
import {SQUAD_PAYMENT_MODAL_SCRIPT_LINK} from "../libs/util"


afterEach(() =>{
    document.body.innerHTML = "";
})

describe("SquadPay", () =>{
    it("should load button to dom with specified text", async () =>{
        const wrapper = mount(SquadPay, {props: {text: "Pay Now"}})
        expect(wrapper.findAll('button').length).toBe(1)
        expect(wrapper.text()).toBe("Pay Now")
        expect(wrapper.findAll('button').length).toBe(1)
        const button = wrapper.find('button')
        expect(button.text()).toBe("Pay Now")
        wrapper.unmount()
    })

    test("if inline script load to dom", () => {
        const wrapper = mount(SquadPay, {props: {text: "Pay Now"}})
        expect(document.getElementsByTagName('script').length).toBe(1)
        expect(document.body.innerHTML).toMatch(new RegExp(SQUAD_PAYMENT_MODAL_SCRIPT_LINK));
        wrapper.unmount()
    })
})