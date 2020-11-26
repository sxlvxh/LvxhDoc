package com.geesanke.plugin.huawei.push.model;

public class Payload {

    private HpsEntity hps;

    
    private Payload(PayloadBuilder payloadBuilder) {
        this.hps = payloadBuilder.hps;
    }


    public Payload() {
    }


    public static PayloadBuilder newInstance() {
        return new PayloadBuilder();
    }
    
    public HpsEntity getHps() {
        return hps;
    }


    public void setHps(HpsEntity hps) {
        this.hps = hps;
    }


    public static final class PayloadBuilder {
        private HpsEntity hps = new HpsEntity();

        private PayloadBuilder() {}

        public PayloadBuilder addMsg(Message msg) {
            this.hps.setMsg(msg);
            return this;
        }

        public PayloadBuilder addExt(Ext ext) {
            this.hps.setExt(ext);
            return this;
        }

        public Payload build() {
            return new Payload(this);
        }
    }

}
