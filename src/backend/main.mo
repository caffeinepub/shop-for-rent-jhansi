import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Shop = {
    title : Text;
    address : Text;
    size : Text;
    monthlyRent : Nat;
    isAvailable : Bool;
    features : [Text];
  };

  type Inquiry = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  let shop : Shop = {
    title = "Prime Retail Space";
    address = "123 Main St, Downtown";
    size = "19x11 feet";
    monthlyRent = 1500;
    isAvailable = true;
    features = [
      "Air Conditioning",
      "Parking Space",
      "Security System",
      "High Foot Traffic",
    ];
  };

  let inquiries = List.empty<Inquiry>();

  public query ({ caller }) func getShop() : async Shop {
    shop;
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, email : Text, message : Text) : async () {
    if (name.size() == 0 or phone.size() == 0 or email.size() == 0 or message.size() == 0) {
      Runtime.trap("All fields are required. Applies to name, phone, email and message.");
    };

    let inquiry : Inquiry = {
      name;
      phone;
      email;
      message;
    };

    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };
};
