tailwind.config = {
    theme: {
        extend: {
            
            colors: {
                mono: {
                  blanco: "var(--mono-blanco)",
                  negro: "var(--mono-negro)",
                },
                bg: {
                  empty: "var(--bg-empty)",

                },
                semaforo: {
                  verde: '#1BCC75',
                  amarillo: '#FFA823',
                  rojo: '#FF3131',
                },
                secundary: {
                  default: '#1A2130',
                  light: '#A5B8D4',
                  opacity: 'rgba(26, 33, 48, 0.479)'
                },
                machine: {
                  primary: '#57CC99',
                  secundary: '#C7F9CC',
                  complement: '#80ED99'
                },
                guru: {
                  primary: '#BB9457',
                  secundary: '#FFE6A7',
                  complement: '#99582A'
                },
                shopper: {
                  primary: '#3D4AEE',
                  secundary: '#87A2FF',
                  complement: '#8E9AAF'
                },
                essentials: {
                  primary: '#FF4D6D',
                  secundary: '#FFB3C1',
                  complement: '#FF758F'
                },
                smart: {
                  primary: '#DEE2FF',
                  secundary: '#FEEAFA',
                  complement: '#EFD3D7'
                },
            },
        },
    },
};

