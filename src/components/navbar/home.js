import { Component } from "react";
import { Carousel, initTE } from "tw-elements";
import AuthenticationService from "../user/AuthenticationService";
import 'tw-elements';

initTE({ Carousel });

class home extends Component {

  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const loggedUserRole = AuthenticationService.loggedUserRole();
    // const loggedUser = AuthenticationService.loggedUserName();
    let loggedAsEManager = false;
    let loggedAsCManager = false;
    let loggedAsEditor = false;
    let unknownUser = false;

    if (isUserLoggedIn === true) {
      console.log("User Logged In")
    } else {
      unknownUser = true;
    }

    if (loggedUserRole != null && loggedUserRole === 'Employee Manager') {
      loggedAsEManager = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'Customer Manager') {
      loggedAsCManager = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'editor') {
      loggedAsEditor = true;
    }

    return (
      <div>
        {/* {isUserLoggedIn && */}
          <div class="">
            <section class="">
              <div class="text-center bg-white text-gray-800 pb-20 px-6">
                <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight uppercase mb-8 drop-shadow-md "><br />
                  <span class="text-orange-500 animate-pulse "> River's Edge </span>
                </h1>
              </div>
            </section>
            <div class="mb-24 container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div class="-m-1 flex flex-wrap md:-m-2">
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://www.jetwinghotels.com/wp-content/uploads/2017/09/hotels-in-sigiriya-sri-lanka-categorythumbnail.jpg"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://www.telegraph.co.uk/content/dam/Travel/hotels/asia/sri-lanka/camellia-hills-sri-lanka-p.jpg"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPI6mKAVOlcNW55S1gphOPdt9F78d6eKozug&usqp=CAU" />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3LJwuD0D7R4JbjL0YBXLkFGjkmv55N0gmjg&usqp=CAU"
                    />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc515dTAZ4-qdFFqJUjWk2JC07zIWL5HQ6-g&usqp=CAU" />
                  </div>
                </div>
                <div class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img
                      alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3pA_iWFfuHFStA4CwW7mViU0SwzEz1zI0Q&usqp=CAU" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* } */}
      </div>
    );
  }
}

export default home;