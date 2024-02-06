import { useEffect } from 'react';
import $ from 'jquery';


const PagePreloder = () => {
    useEffect(() => {
        $(".loader").fadeOut();
        $("#preloder").delay(250).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
      }, []);
    return ( 
    <>
        <div id="preloder">
            <div className="loader"></div>
        </div>
    </> 
    );
}
 
export default PagePreloder;